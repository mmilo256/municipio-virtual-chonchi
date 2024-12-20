import User from "../Models/userModel.js"

export const getUserIdByRut = async (req, res) => {
    const { run } = req.query
    if (!run) {
        return res.send("No se proporcionó ningún RUT")
    }
    const userId = await User.findOne({ attributes: ["id"], where: { run } })
    if (!userId) {
        return res.send("No se encontró ningún usuario con este RUT")
    }
    res.status(200).json({ userId })
}