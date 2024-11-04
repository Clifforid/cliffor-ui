export default function () {
  if (PROD) {
    const logo = `
  ___________________________________________________________________________________
  
    ______ _____   _______ _______ _______ _______ ______        _______ _______ 
    |      |     |_|_     _|    ___|    ___|       |   __ \______|   |   |_     _|
    |   ---|       |_|   |_|    ___|    ___|   -   |      <______|   |   |_|   |_ 
    |______|_______|_______|___|   |___|   |_______|___|__|      |_______|_______|                                                                             
                                             
  ___________________________________________________________________________________
                                     author:Clifforid
  `;

    const rainbowGradient = `
  background: linear-gradient(135deg, orange 60%, cyan);
  background-clip: text;
  color: transparent;
  font-size: 16px; 
  line-height: 1;
  font-family: monospace;
  font-weight: 600;
  `;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[ClifforUI]:dev mode...");
  }
}
