import React from "react";
import CustomMap from "@components/Map";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const mapData = {
    // '43.466243710128296, -80.51753878383373'
  center: { lat: 43.47948476630009, lng: -80.5184849866083 },
  zoom :15,
  markers:[
    { position: { lat: 43.47948476630009, lng: -80.5184849866083 } },
    { position: { lat: 43.476064964767424, lng: -80.51615542231036 } },
  ],
}

const ContactList = [
  {
    text: "contact@company.com",
    icon: <MailOutlineIcon fontSize="large" />,
  },
  {
    text: "(123)456-789",
    icon: <LocalPhoneOutlinedIcon fontSize="large" />,
  },
  {
    text: "794 Mcallister St, Waterloo city, 941 N02",
    icon: <RoomOutlinedIcon fontSize="large" />,
  },
];

function Contact() {
  return (
    <div className="contact-area">
      <div className="contact-area-banner">
        <div className="contact-area-banner-info">
          <h1>Contact us</h1>
          <h2>Create your account today and get started for free!</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit dolor semper
            at ac tempus enim.
          </p>
        </div>
      </div>

      <div className="contact-area-map">
        <CustomMap
          {...mapData}
          style={`contact-area-map-contactMap`}
          mapStyle={ {
            width: '100%',
            height: '70vh'
          }}
        />

        <div className="contact-area-map-info">
          {ContactList.map((item, index) => (
            <div className="contact-area-map-info-item" key={index}>
              {item.icon}
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
