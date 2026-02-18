import mongoose from "mongoose";

const travelerSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});

const travelRequestSchema = new mongoose.Schema(
  {
    travelRequestId: {
      type: String,
      unique: true,
    },
    isB1Approved: { type: Boolean, default: false },
    isB2Approved: { type: Boolean, default: false },
    isB1Rejected: { type: Boolean, default: false },
    isB2Rejected: { type: Boolean, default: false },
    name: {
      type: String,
      // required: true,
    },
    empCode: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    dateOfRequest: {
      type: Date,
    },

    travelDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
    },
    source: {
      type: String,
    },
    destination: {
      type: String,
    },
    purposeOfTravel: {
      type: String,
    },
    proposedVisit: {
      type: String,
    },
    travelMode: {
      type: String,
      enum: ["air", "train", "bus", "cab"],
    },
    hotelStay: {
      type: String,
      enum: ["yes", "no"],
    },
    checkInDate: {
      type: Date,
    },
    checkOutDate: {
      type: Date,
    },
    reportingManager: {
      type: String,
    },
    vendors: {
      type: String,
      default: "",
    },
    remarks: {
      type: String,
    },
    isBooked: { type: Boolean, default: false },
    status: {
      type: String,
      default: "pending",
    },
    bookMarks: {
      type: String,
      default: null,
    },
    travelers: [travelerSchema],
    uploadBill: { type: [String], default: [] },
    uploadTicket: { type: [String], default: [] },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Login",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TravelRequestModel = mongoose.model("TravelRequest", travelRequestSchema);

export default TravelRequestModel;
