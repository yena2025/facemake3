const URL = "./public/model/";
let model;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
}

async function predict(imageElement) {
  const prediction = await model.predict(imageElement);
  const estrogen = Math.round(prediction[0].probability * 100);
  const testosterone = Math.round(prediction[1].probability * 100);

  document.getElementById("result").innerHTML = `
    <h2>분석 결과</h2>
    <p>에스트로겐: ${estrogen}%</p>
    <p>테스토스테론: ${testosterone}%</p>
  `;
}

document.getElementById("imageUpload").addEventListener("change", async function () {
  const file = this.files[0];
  const img = new Image();
  img.onload = async function () {
    await init();
    await predict(img);
  };
  img.src = URL.createObjectURL(file);
});
