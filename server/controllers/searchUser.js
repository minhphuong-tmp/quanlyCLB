import Users from "../models/user.model.js";

export const searchUser = async (request, response) => {
    try {
        const { search } = request.body

        const query = new RegExp(search, "i", "g")

        const user = await Users.find({
            "$or": [
                { username: query }
            ]
        }).select("-password")

        return response.json({
            message: 'all user',
            data: user,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

