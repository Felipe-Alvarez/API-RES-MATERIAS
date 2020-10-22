const {Router} = require("express")
const router = Router()
const fs = require("fs")
const File_Mat = fs.readFileSync('./materias.json', 'utf-8')
const JSONMaterias = JSON.parse(File_Mat)

router.get("/", (req, res) => {
  res.send("DESPLIEGUE-MATERIAS = TRUE")
});

router.get("/materias", (req, res) => {
  res.json(JSONMaterias)
})

router.post("/materias", (req, res) => {
  let id = JSONMaterias.length + 1
  let {materia, codigo} = req.body
  let nuevaMateria = {
    "id" : id,
    "materia" : materia,
    "codigo" : codigo
  } 
  JSONMaterias.push(nuevaMateria)
  fs.writeFileSync('./materias.json', JSON.stringify(JSONMaterias), 'utf-8')
  res.status(201).json(nuevaMateria)
})

router.get("/materias/:id", (req,res) => {
  let id = req.params.id
  let materiaEncontrada = JSONMaterias.find(materia => materia.id == id)

  if(materiaEncontrada != undefined)
    res.status(200).json(materiaEncontrada)
  else
    res.json(`La materia ${id} no existe`)
})

router.put("/materias/:id", (req,res) => {
  let id = req.params.id 
  let {materia, codigo} = req.body

  let materiaModifcada = JSONMaterias.find(materias => {
    if(materias.id == id){
      materias.materia = materia
      materias.codigo = codigo
      return materias
    }
  })

  if(materiaModifcada != undefined){
    fs.writeFileSync('./materias.json', JSON.stringify(JSONMaterias), 'utf-8')
    res.status(201).json(materiaModifcada)
  }else{
    res.status(200).json(`La materia ${id} no existe`)
  }

})

router.delete("/materias/:id", (req, res) => {
  let id = req.params.id
  let indexMateria = JSONMaterias.findIndex(materia => materia.id == id)
  if(indexMateria != -1){
    JSONMaterias.splice(indexMateria, 1)
    fs.writeFileSync('./materias.json', JSON.stringify(JSONMaterias), 'utf-8')
    res.status(200).json({mensaje : `La Materia ${id} fue eliminada`})
  }else{
    res.json(`La materia ${id} no existe`)
  }
})

module.exports = router