import userService from "../services/user.service.js"; 

const createUser = async (req, res) => {
    try{
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error){
        res.status(400).send(error.message);
    }
};

const getAllUsers = async(req, res)=>{
    try{
        const user = await userService.getAllUsers();
    } catch (error){
        res.status(400).send(error.message);
    }
};

const getById = async(req, res) => {
    try{
        const user = await userService.getById(req.params.id);
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const updateUser = async(req, res) => {
    try{
        const user = await userService.updateUser(req.params.id, req.body);
    } catch (error){
        res.status(400).send(error.message)
    }
};

const deleteUser = async(req, res) => {
    try{
        const user = await userService.deleteUser(req.params.id);
    } catch (error){
        res.status(400).send(error.message)
    }
};

export default {createUser, getAllUsers, getById, updateUser, deleteUser};