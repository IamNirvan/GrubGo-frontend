import { create } from "zustand";
import FeedbackAlertTypes from "../constants/feedbackAlertTypes";
import PropTypes from "prop-types";

const useFeedbackAlertStore = create((set) => ({
  alert: {
    msg: "",
    type: "",
    onConfirm: null,
  },
  showFeedback: (msg, type, onConfirm) =>
    set({ alert: { msg, type, onConfirm } }),
  hideAlert: () => set({ alert: { msg: "", type: "", onConfirm: null } }),
}));

// Define the runtime type checking...
useFeedbackAlertStore.PropTypes = {
  alert: PropTypes.shape({
    msg: PropTypes.string,
    type: PropTypes.oneOf([
      FeedbackAlertTypes.SUCCESS,
      FeedbackAlertTypes.WARNING,
      FeedbackAlertTypes.FAILED,
    ]),
    onConfirm: PropTypes.func,
  }),
  showFeedback: PropTypes.func,
  hideAlert: PropTypes.func,
};

export default useFeedbackAlertStore;
