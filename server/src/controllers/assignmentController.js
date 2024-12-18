import assignmentModel from "../models/assignmentModel.js";
import path from "path";

export const addFileController = async (req, res) => {
  try {
    if (!req) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }

    const { assignment, id, uploadedBy,path,filename,status } = req.body;
    
    // const { filename, mimetype, path } = req.file; // Destructure the file details

    // const filedetails = await new assignmentModel({
    //   filename,
    //   mimetype,
    //   path,
    //   assignment,
    //   uploadedby,
    //   id,
    // }).save();
    const filedetails = await new assignmentModel({
      path,
      filename,
      uploadedBy,
      assignment,
      id,
      status
    }).save();
    
    res.status(201).send({
      success: true,
      message: "File uploaded successfully",
      filedetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "File not uploaded to DB",
      error,
    });
  }
};

export const getassignmentController = async (req, res) => {
  try {
    const results = await assignmentModel.find();

    

    res.status(200).send({
      success: true,
      message: 'Files found',
      result: results,
    });
  } catch (error) {
    console.error("Error in assignmentController:", error);
  }
};
