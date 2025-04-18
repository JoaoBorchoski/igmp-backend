import { runAcre, runAlagoas, runAmapa, runAmazonas, runBahia, runCeara, runDistritoFederal, runEspiritoSanto, runGoias, runMaranhao, runMatoGrosso, runMatoGrossoDoSul, runMinasGerais, runPara, runParaiba, runParana, runPernambuco, runPiaui, runRioDeJaneiro, runRioGrandeDoNorte, runRioGrandeDoSul, runRondonia, runRoraima, runSantaCatarina, runSaoPaulo, runSergipe, runTocantins, } from "./ceps-por-estado"


const run = async () => {
  await runAcre()
  await runAlagoas()
  await runAmazonas()
  await runAmapa()
  await runBahia()
  await runCeara()
  await runDistritoFederal()
  await runEspiritoSanto()
  await runGoias()
  await runMaranhao()
  await runMinasGerais()
  await runMatoGrossoDoSul()
  await runMatoGrosso()
  await runPara()
  await runParaiba()
  await runPernambuco()
  await runPiaui()
  await runParana()
  await runRioDeJaneiro()
  await runRioGrandeDoNorte()
  await runRondonia()
  await runRoraima()
  await runRioGrandeDoSul()
  await runSantaCatarina()
  await runSergipe()
  await runSaoPaulo()
  await runTocantins()
}

export async function ceps() {
  await run()
}
