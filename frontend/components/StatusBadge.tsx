import React from "react";
import { View, Text } from "react-native";

interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<
  StatusBadgeProps["status"],
  { bg: string; text: string }
> = {
  Pending: { bg: "#FFEB3B", text: "#795548" },
  Confirmed: { bg: "#4CAF50", text: "#fff" },
  Cancelled: { bg: "#F44336", text: "#fff" },
  Reschedule: { bg: "#2196F3", text: "#fff" },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const color = statusColors[status];

  return (
    <View
      style={{
        backgroundColor: color?.bg ? color?.bg : "#FFEB3B",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: color?.bg ? color?.bg : "#FFEB3B",
          marginRight: 6,
        }}
      />
      <Text
        style={{
          color: color?.text ? color?.text : "black",
          fontSize: 12,
          fontWeight: "600",
          textTransform: "capitalize",
        }}
      >
        {status}
      </Text>
    </View>
  );
};

export default StatusBadge;
