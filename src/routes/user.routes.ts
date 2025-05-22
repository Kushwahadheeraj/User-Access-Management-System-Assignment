import { Router } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entity/User";
import { Request, Response } from "express";

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Get all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await userRepository.find({
            select: ["id", "email", "firstName", "lastName", "role", "isActive", "createdAt"]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOne({
            where: { id: parseInt(req.params.id) },
            select: ["id", "email", "firstName", "lastName", "role", "isActive", "createdAt"]
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
});

// Update user
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, role, isActive } = req.body;
        const user = await userRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.role = role || user.role;
        user.isActive = isActive !== undefined ? isActive : user.isActive;

        await userRepository.save(user);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
});

// Delete user
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOne({
            where: { id: parseInt(req.params.id) }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await userRepository.remove(user);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

export default router; 