import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB successfully connected on ${con.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Failed to connect ${err}`.red.underline.bold);
    process.exit(1);
  }
};
