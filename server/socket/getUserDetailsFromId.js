
import Users from "../models/user.model.js";  // Thêm .js


const getUserDetailsFromId = async (id) => {

    // const user = await Users.findOne({ _id: id }).select('-password')
    const user = await Users.findById(id).select('-password')

    return user
}

export default getUserDetailsFromId; 