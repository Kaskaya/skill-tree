import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./SkillTree.css";

const explanations = {
  "b1-s1": "+%20 More damage when using blunt weapons",
  "b1-s2": "Your hits make enemy bleed",
  "b1-s3": "Your hits make enemy froze",
  "b1-s4": "Gain +%25 Attack Power",
  "b1-s5": "A perfect parry makes your next attack a critical attack",
  "b1-s6": "Set your weapon on fire and make enemies burn",
  "b1-s7":
    "Hitting enemies over time raises attack power by +%3. Stacks up to 5 times",
  "b1-s8":
    "Activate the Meat Grinder. Gain +%20 Attack Power and +%20 Ability Power. Your Attacks restores Hp",
  "b2-s1": "Defensive Skill 1",
  "b2-s2": "Defensive Skill 2",
  "b2-s3": "Defensive Skill 3",
  "b2-s4": "Defensive Skill 4",
  "b2-s5": "Defensive Skill 5",
  "b2-s6": "Defensive Skill 6",
  "b2-s7": "Defensive Skill 7",
  "b2-s8": "Defensive Skill 8",
  "b3-s1": "Active Skill 1",
  "b3-s2": "Active Skill 2",
  "b3-s3": "Active Skill 3",
  "b3-s4": "Active Skill 4",
  "b3-s5": "Active Skill 5",
  "b3-s6": "Active Skill 6",
  "b3-s7": "Active Skill 7",
  "b3-s8": "Active Skill 8",
};

const createSkillsData = (useAnimation) => [
  {
    name: "Branch 1",
    skills: Array(8)
      .fill()
      .map((_, i) => ({
        id: `b1-s${i + 1}`,
        selected: false,
        img: `/offensive-skill${i + 1}.png`,
        animationControls: useAnimation(),
      })),
  },
  {
    name: "Branch 2",
    skills: Array(8)
      .fill()
      .map((_, i) => ({
        id: `b2-s${i + 1}`,
        selected: false,
        img: `/defensive-skill${i + 1}.png`,
        animationControls: useAnimation(),
      })),
  },
  {
    name: "Branch 3",
    skills: Array(8)
      .fill()
      .map((_, i) => ({
        id: `b3-s${i + 1}`,
        selected: false,
        img: `/active-skill${i + 1}.png`,
        animationControls: useAnimation(),
      })),
  },
];

const SkillTree = () => {
  const [skillPoints, setSkillPoints] = useState(20);
  const [skills, setSkills] = useState(createSkillsData(useAnimation));
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const handleSkillClick = (branchIndex, skillIndex) => {
    const newSkills = [...skills];
    const branch = newSkills[branchIndex];
    const skill = branch.skills[skillIndex];

    const rows = [[0], [1, 2], [3], [4, 5], [6], [7]];
    const rowIndex = rows.findIndex((row) => row.includes(skillIndex));

    // Check if previous skills are selected
    if (rowIndex > 0) {
      const previousRow = rows[rowIndex - 1];
      const anyPreviousSelected = previousRow.some(
        (prevIdx) => branch.skills[prevIdx].selected
      );
      if (!anyPreviousSelected) {
        return; // If no previous skill is selected, do nothing
      }
    }

    const isTwoSkillRow = rows[rowIndex].length === 2;

    if (skill.selected) {
      // Unselect the skill only if the next row is not selected
      if (
        rowIndex === rows.length - 1 ||
        !rows[rowIndex + 1].some((idx) => branch.skills[idx].selected)
      ) {
        skill.selected = false;
        setSkillPoints(skillPoints + 1);
      }
    } else {
      // Check if any skill in the row is already selected
      const anySelectedInRow = rows[rowIndex].some(
        (idx) => branch.skills[idx].selected
      );

      // If not, decrease the skill points
      if (!anySelectedInRow) {
        setSkillPoints(skillPoints - 1);
      }

      // Unselect other skills in the row
      rows[rowIndex].forEach((idx) => {
        if (idx !== skillIndex) {
          branch.skills[idx].selected = false;
        }
      });

      skill.selected = true;
    }

    setSkills(newSkills);

    // Trigger the scale animation for the clicked skill
    skill.animationControls.start({
      scale: [1, 0.9, 1],
      transition: { duration: 0.3 },
    });
  };

  const renderSkills = (branch, branchIndex) => {
    const rows = [[0], [1, 2], [3], [4, 5], [6], [7]];

    return rows.map((row, rowIndex) => (
      <div key={`branch-${branchIndex}-row-${rowIndex}`} className="row">
        {row.map((skillIndex) => (
          <div key={branch.skills[skillIndex].id} className="skill-wrapper">
            {rowIndex === 1 && row.length === 2 && (
              <>
                {skillIndex === 1 && (
                  <motion.div
                    className={`connector-straight ${
                      branch.skills[0].selected &&
                      branch.skills[skillIndex].selected
                        ? "active"
                        : ""
                    }`}
                    initial={{}}
                    animate={{
                      borderColor:
                        branch.skills[0].selected &&
                        branch.skills[skillIndex].selected
                          ? "yellow"
                          : "gray",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                {skillIndex === 2 && (
                  <motion.div
                    className={`connector-right ${
                      branch.skills[0].selected &&
                      branch.skills[skillIndex].selected
                        ? "active"
                        : ""
                    }`}
                    initial={{}}
                    animate={{
                      borderColor:
                        branch.skills[0].selected &&
                        branch.skills[skillIndex].selected
                          ? "yellow"
                          : "gray",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </>
            )}
            {rowIndex > 0 && row.length === 2 && (
              <>
                {skillIndex === row[0] && (
                  <motion.div
                    className={`connector-left ${
                      branch.skills[skillIndex].selected &&
                      branch.skills[row[0]].selected
                        ? "active"
                        : ""
                    }`}
                    initial={{}}
                    animate={{
                      borderColor:
                        branch.skills[skillIndex].selected &&
                        branch.skills[row[0]].selected
                          ? "yellow"
                          : "gray",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                {skillIndex === row[1] && (
                  <motion.div
                    className={`connector-right ${
                      branch.skills[skillIndex].selected &&
                      branch.skills[row[1]].selected
                        ? "active"
                        : ""
                    }`}
                    initial={{}}
                    animate={{
                      borderColor:
                        branch.skills[skillIndex].selected &&
                        branch.skills[row[1]].selected
                          ? "yellow"
                          : "gray",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </>
            )}
            {rowIndex > 0 && row.length === 1 && (
              <>
                {skillIndex === 3 && (
                  <>
                    <motion.div
                      className={`connector-right ${
                        branch.skills[1].selected &&
                        branch.skills[skillIndex].selected
                          ? "active"
                          : ""
                      }`}
                      initial={{}}
                      animate={{
                        borderColor:
                          branch.skills[1].selected &&
                          branch.skills[skillIndex].selected
                            ? "yellow"
                            : "gray",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className={`connector-left ${
                        branch.skills[2].selected &&
                        branch.skills[skillIndex].selected
                          ? "active"
                          : ""
                      }`}
                      initial={{}}
                      animate={{
                        borderColor:
                          branch.skills[2].selected &&
                          branch.skills[skillIndex].selected
                            ? "yellow"
                            : "gray",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </>
                )}
                {skillIndex === 6 && (
                  <>
                    <motion.div
                      className={`connector-right ${
                        branch.skills[4].selected &&
                        branch.skills[skillIndex].selected
                          ? "active"
                          : ""
                      }`}
                      initial={{}}
                      animate={{
                        borderColor:
                          branch.skills[4].selected &&
                          branch.skills[skillIndex].selected
                            ? "yellow"
                            : "gray",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className={`connector-left ${
                        branch.skills[5].selected &&
                        branch.skills[skillIndex].selected
                          ? "active"
                          : ""
                      }`}
                      initial={{}}
                      animate={{
                        borderColor:
                          branch.skills[5].selected &&
                          branch.skills[skillIndex].selected
                            ? "yellow"
                            : "gray",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </>
                )}
              </>
            )}
            {rowIndex > 0 && row.length === 1 && (
              <motion.div
                className={`connector-straight ${
                  branch.skills[rows[rowIndex - 1][0]].selected &&
                  branch.skills[skillIndex].selected
                    ? "active"
                    : ""
                }`}
                initial={{}}
                animate={{
                  borderColor:
                    branch.skills[rows[rowIndex - 1][0]].selected &&
                    branch.skills[skillIndex].selected
                      ? "yellow"
                      : "gray",
                }}
                transition={{ duration: 0.5 }}
              />
            )}
            <div
              className="explanation"
              style={{
                visibility:
                  hoveredSkill === branch.skills[skillIndex].id
                    ? "visible"
                    : "hidden",
              }}
            >
              {explanations[branch.skills[skillIndex].id]}
            </div>
            <motion.img
              src={branch.skills[skillIndex].img}
              alt={`Skill ${skillIndex + 1}`}
              className={`skill ${
                branch.skills[skillIndex].selected ? "selected" : ""
              }`}
              onClick={() => handleSkillClick(branchIndex, skillIndex)}
              onMouseEnter={() => setHoveredSkill(branch.skills[skillIndex].id)}
              onMouseLeave={() => setHoveredSkill(null)}
              animate={branch.skills[skillIndex].animationControls}
              initial={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="skill-tree">
      <h1>Skill Tree</h1>
      <p>Skill Points: {skillPoints}</p>
      <div className="branches">
        {skills.map((branch, index) => (
          <div key={branch.name} className="branch">
            <h2>{branch.name}</h2>
            {renderSkills(branch, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return <SkillTree />;
};

export default App;
