import Cake from "../models/Cake.js";


// GET ALL CAKES
export const getCakes = async (req, res) => {

    try {

        const cakes = await Cake.find();

        res.status(200).json(cakes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// GET SINGLE CAKE
export const getCakeById = async (req, res) => {

    try {

        const cake = await Cake.findById(req.params.id);

        if (!cake) {
            return res.status(404).json({ message: "Cake not found" });
        }

        res.status(200).json(cake);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// ADD CAKE
export const addCake = async (req, res) => {

    try {

        const {
            name,
            category,
            price,
            weight,
            description
        } = req.body;

        const cake = await Cake.create({
            name,
            category,
            price,
            weight,
            description,
            image: req.file.path
        });

        res.status(201).json({
            message: "Cake Added",
            cake
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE CAKE
export const deleteCake = async (req, res) => {

    try {

        await Cake.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Cake Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

export const updateCake = async (req, res) => {

    try {

        const {
            name,
            category,
            price,
            weight,
            description,
            available
        } = req.body;

        const updatedData = {
            name,
            category,
            price,
            weight,
            description,
            available
        };

        // IF NEW IMAGE EXISTS
        if (req.file) {
            updatedData.image = req.file.path;
        }

        const updatedCake = await Cake.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {
                new: true
            }
        );

        res.status(200).json({
            message: "Cake Updated",
            updatedCake
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};