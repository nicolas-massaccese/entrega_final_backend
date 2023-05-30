const User = require("../models/user");

const createUser = async () => {
    const usersToAdd = [
        {
            email: req.session.username,
            password: req.session.password,
            firstname: req.session.firstname,
            address: req.session.address,
            age: req.session.age,
            phoneNumber: req.session.phoneNumber
        },
        
    ];
    const promises = usersToAdd.map(user => {
        const newUser= new User(user);

        return newUser.save();
    });

    await Promise.all(promises);
};


const readUser = async () => {
    const sortedUsers = await User.find({})
    return sortedUsers;
};

const readOneUser = async () => {
    const sortedUsers = await User.findOne({})
    return sortedUsers;
};

const updateOneUser = async () => {
    const sortedUsers = await User.findByIdAndUpdate({})
    return sortedUsers;
};


const deleteOneUser = async () => {
    const sortedUsers = await User.findByIdAndDelete({})
    return sortedUsers;
};


module.exports = {createUser, readUser, readOneUser, updateOneUser, deleteOneUser }