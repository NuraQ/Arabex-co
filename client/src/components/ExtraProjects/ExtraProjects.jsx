import React from "react";
import { mainUrl } from "../../globals";
import "./ExtraProjects.css";

const ExtraProjects = ({ projects }) => {
  if (projects) {
    return projects.map((project) => (
      <div className="grid-item">
        <div className="colorBack">
          <img
            class="imgStyle"
            src={encodeURI(
              mainUrl +
                "/load_image/?img=" +
                `${project.image}` +
                "&&type=" +
                `${project.category_id}`
            )}
          />
        </div>
      </div>
    ));
  } else {
    return <div>dfx</div>;
  }
};

export default ExtraProjects;
