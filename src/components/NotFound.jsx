import React from "react";
import { motion,AnimatePresence } from "framer-motion"

// MUI
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

function NotFound() {
  return (
    <motion.div 
      className="notFound"
      initial={{ scale: 2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SearchOffOutlinedIcon sx={{}} />
      <p>Sorry!! Nothing found...</p>
    </motion.div>
  );
}

export default NotFound;
