import Users from "../models/user.model.js";

export const getUserName = async (request, response) => {
    try {
        const { userId } = request.params
        console.log("userId:", userId)

        const query = new RegExp(userId, "i")

        const user = await Users.findById(userId).select("-password");

        if (!user) {
            return response.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Trả về username
        return response.json({
            message: "User found by ID",
            data: user.username,

            success: true,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Internal server error",
            error: true,
        });
    }
};
