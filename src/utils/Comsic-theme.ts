export const COSMIC_COLORS = {
    primaryDark: "#1b102e",
    primary: "#25173b",
    primaryLight: "#352252",
    secondaryDark: "#e19425",
    secondary: "#fbbe65",
    secondaryLight: "#ffd08a",
    accent: "#ff6b6b",
    success: "#4caf50",
    warning: "#ff9800",
    textLight: "#ffffff",
    textDark: "#25173b",
    cosmicBlue: "#4c73e3",
    cosmicPink: "#f271c7",
    cosmicPurple: "#6344c4",
    glowColor: "rgba(251, 190, 101, 0.6)",
  }
  
  export const COSMIC_ANIMATIONS = {
    glow: `
      @keyframes glow {
        0% { box-shadow: 0 0 5px ${COSMIC_COLORS.glowColor}; }
        50% { box-shadow: 0 0 20px ${COSMIC_COLORS.glowColor}, 0 0 30px ${COSMIC_COLORS.secondaryLight}; }
        100% { box-shadow: 0 0 5px ${COSMIC_COLORS.glowColor}; }
      }
    `,
    float: `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
    `,
    pulse: `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
    `,
  }
  