const Users = require("../database/models/User"); // Import the Users model
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require("fs");
const transportMail = require("../config/nodemailer");
const path = require("path");
const Lab = require("../database/models/Lab");
const Doctor = require("../database/models/Doctor");
const { faker } = require("@faker-js/faker");

//get all users
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials, Email does not exist" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid credentials, password is Wrong" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // You can add other user details as needed
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: "1h" }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({
          user,
          token,
          msg: `${user.firstName} ${user.lastName} was logged in successfully`,
        });
      }
    );
  } catch (err) {
    console.error("Login error: ", err.message);
    res.status(500).send("Server error");
  }
};

//create new user
exports.register = async (req, res) => {
  const { email, role } = req.body;

  try {
    // Check if user exists
    let user = await Users.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = await Users.create(req.body);

    // Create dummy doctor if role is 'Doctor'
    if (role === "Doctor") {
      await Doctor.create({
        userId: user.id,
        lab: faker.number.int({ min: 1, max: 5 }),
        specialty: faker.number.int({ min: 1, max: 5 }),
        bio: faker.lorem.sentence(),
        availableFrom: "09:00 AM",
        availableTo: "05:00 PM",
        ratings: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        location: faker.location.city() + ", " + faker.location.country(),
        price: faker.number.float({ min: 20, max: 200, precision: 0.01 }),
        image: faker.image.avatar(),
        education: {
          school: faker.person.jobTitle(),
          location: faker.location.city(),
          year: faker.number.int({ min: 2000, max: 2024 }),
        },
        service: ["Consultation", "Surgery", "Therapy"].slice(
          0,
          faker.number.int({ min: 1, max: 3 })
        ),
        experience: {
          name: faker.person.jobTitle(),
          location: faker.location.city(),
          year: faker.number.int({ min: 2010, max: 2024 }),
        },
      });
    }

    // Create dummy lab if role is 'Lab'
    if (role === "Labs") {
      await Lab.create({
        name: faker.company.name(),
        image: faker.image.url(),
        description: faker.lorem.sentence(),
        location: faker.location.city() + ", " + faker.location.country(),
      });
    }

    // Generate JWT token
    const payload = { id: user.id, name: user.name };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({
        user,
        token,
        msg: `${user.firstName} ${user.lastName} account has been created`,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
};

// forgotten password send email
exports.send_token = async (req, res) => {
  const { user_id, title } = req.body;

  try {
    // Find the user by email
    const user = await Users.findOne({ where: { id: user_id } });

    // Check if user is null
    if (!user) {
      return res.status(404).json({ msg: "User not found" }); // Return 404 if user not found
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(3).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Read the HTML template
    const filePath = path.join(__dirname, "../mails/send_token.html");
    let mailTemplate = fs.readFileSync(filePath, "utf-8");
    // Replace the reset token in the template
    mailTemplate = mailTemplate.replace("{{token}}", resetToken);
    mailTemplate = mailTemplate.replace(
      "{{name}}",
      user?.firstName + " " + user?.lastName
    );
    mailTemplate = mailTemplate.replace(
      "{{company_name}}",
      process.env.DB_NAME
    );
    // Send email

    const transporter = transportMail;

    const mailOptions = {
      to: user?.email,
      subject: title,
      html: mailTemplate, // Use the modified HTML template
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ msg: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

//set new  password
exports.forget_password_confirm = async (req, res) => {
  // Find the user by ID
  const { confirm_password, password, reset_token, user_id } = req.body; // Get new password from body

  if (!user_id) {
    return res.status(400).json({ msg: "User ID is required" });
  }

  try {
    const user = await Users.findOne({ where: { id: user_id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the reset token is valid and not expired
    if (user.resetToken !== reset_token || Date.now() > user.resetTokenExpiry) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Validate that both passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    //reset new password
    user.password = password;

    // Clear the reset token and expiry
    user.resetToken = null;
    user.resetTokenExpiry = null;

    // Save the user
    await user.save();

    return res
      .status(200)
      .json({ msg: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

// set new email
exports.reset_email_confirm = async (req, res) => {
  // const {} = req.query; // Get reset_token from params
  const { email, reset_token, id } = req.body; // Get new email from body

  if (!id) {
    return res.status(400).json({ msg: "User ID is required" });
  }
  try {
    // Find the user by reset token
    const user = await Users.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the reset token is valid and not expired
    if (user.resetToken !== reset_token || Date.now() > user.resetTokenExpiry) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // Update user's email
    user.email = email;
    user.resetToken = null; // Clear the reset token
    user.resetTokenExpiry = null; // Clear the expiry
    await user.save();

    return res
      .status(200)
      .json({ msg: "Email has been updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error." });
  }
};

exports.third_party_auth = async (req, res) => {
  try {
    // Custom logic here if needed
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, msg: `${req.user.email} was logged in successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong during authentication" });
  }
};
