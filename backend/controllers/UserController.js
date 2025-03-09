const User = require("../database/models/User"); // Import the User model
const fs = require("fs");
const path = require("path");
const Appointment = require("../database/models/Appointment");
const Notification = require("../database/models/Notification");
const Message = require("../database/models/Message");
const Doctor = require("../database/models/Doctor");
const MyDoctor = require("../database/models/MyDoctor");
const Transaction = require("../database/models/Transaction");
const Lab = require("../database/models/Lab");
const Specialty = require("../database/models/Specialty");
const PaymentMethod = require("../database/models/PaymentMethod");

//get all users
exports.get = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//show specific user
exports.show = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Appointment,
          as: "AppointmentsAsPatient",
          foreignKey: "patientId",
        },
        {
          model: Appointment,
          as: "AppointmentsAsDoctor",
          foreignKey: "doctorId",
        },
        {
          model: Notification,
          foreignKey: "userId",
        },
        {
          model: Message,
          as: "SentMessages",
          foreignKey: "senderId",
        },
        {
          model: Message,
          as: "ReceivedMessages",
          foreignKey: "receiverId",
        },
        {
          model: Doctor,
          as: "doctor",
          include: [
            {
              model: Lab,
              through: { attributes: [] },
            },
            {
              model: Specialty,
              through: { attributes: [] },
            },
          ],
        },
        {
          model: MyDoctor,
          as: "MyDoctors",
          include: [{ model: User, as: "Doctor" }],
        },
        {
          model: MyDoctor,
          as: "Patients",
          include: [{ model: User, as: "Patient" }],
        },
        {
          model: Transaction,
          include: [PaymentMethod],
        },
      ],
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User Controller
exports.delete = async (req, res) => {
  const userId = req.params.id; // Retrieve user ID from the request parameters

  try {
    const user = await User.findByPk(userId); // Find the user by ID
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // If user does not exist
    }

    // Optionally, you can also delete related Location data if needed
    await Location.destroy({ where: { id: user.location_id } }); // Delete the related location

    await user.destroy(); // Delete the user
    return res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

exports.update = async (req, res) => {
  const { firstName, lastName, role, email, mobile } = req.body; // Retrieve fields from the request body
  const userId = req.params.id; // Assuming user ID is passed as a URL parameter

  console.log(firstName, lastName, role, email, mobile);
  try {
    // Find the user by primary key
    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Handle profileImage if a new file is uploaded
    let profileImage = user.profileImage; // Default to the existing image
    if (req.files && req.files["show"]) {
      const uploadedImagePath = req.files["show"][0].path.replace(
        /^public[\\/]/,
        ""
      ); // Remove 'public/' from the path

      // Delete the old profile image if it exists
      if (user.profileImage) {
        const oldFilePath = path.join(
          __dirname,
          "../public/images",
          user.profileImage
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Delete the old file
        }
      }

      // Update the profile image with the new path
      profileImage = uploadedImagePath;
    }

    // Update user fields
    await User.update(
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        role: role || user.role,
        email: email || user.email,
        mobile: mobile || user.mobile,
        profileImage: profileImage,
      },
      {
        where: { id: userId },
      }
    );

    // Fetch the updated user data
    user = await User.findByPk(userId);

    return res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "User update failed", error });
  }
};

exports.isLoggedIn = async (req, res) => {
  try {
    const user = req.user;

    if (user) {
      const getUser = await User.findByPk(user.id, {});

      if (!getUser) {
        return res.status(404).json({ status: false });
      }

      return res
        .status(200)
        .json({ msg: "User is logged in", status: true, user: getUser });
    }

    return res.status(401).json({ status: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", status: false });
  }
};
