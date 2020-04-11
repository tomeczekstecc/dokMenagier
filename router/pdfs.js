const express = require('express');
const router = express.Router();
const Pdf = require('../models/Pdf');

// Get all pdfs
router.get('/', async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ order: 1 });
    res.status(200).json({
      result: 'success',
      msg: 'Pobrano informacje o wszystkich instrukcjach.',
      count: pdfs.length,
      data: pdfs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Server error',
    });
  }
});

// Get one pdf
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pdf = await Pdf.findById(id);
    res.status(200).json({
      result: 'success',
      msg: 'Pobrano informacje o instrukcji.',
      data: pdf,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        msg: 'Server errror [500]',
        result: 'warning',
        error: 'Server error',
      });
  }
});

// create a pdf
router.post('/', async (req, res) => {
  const {
    title,
    type,
    target,
    shortTitle,
    publishDate,
    ver,
    pagesCount,
    prevVer,
    premiereTag,
    archived,
  } = req.body;

  try {
    if (
      title === '' ||
      type === '' ||
      target === '' ||
      shortTitle === '' ||
      publishDate === '' ||
      ver === '' ||
      pagesCount === '' ||
      prevVer === '' ||
      premiereTag === '' ||
      archived === ''
    ) {
      return res.json({
        result: 'error',
        msg: 'Nie uzupełniono wszystkich wymaganych pól.',
      });
    }
    const allTypepdfs = await Pdf.find({ target, type, archived });

    const requiredFields = {
      title,
      type,
      target,
      shortTitle,
      publishDate,
      ver,
      pagesCount,
      prevVer,
      premiereTag,
      archived,
      order: allTypepdfs.length + 1,
    };

    await Pdf.create(requiredFields);

    return res.json({
      result: 'success',
      msg: 'Utworzono nową instrukcję.',
    });
  } catch (error) {
    console.log(error);
  }
});

// edit

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    target,
    shortTitle,
    publishDate,
    ver,
    pagesCount,
    prevVer,
    premiereTag,
    archived,
  } = req.body;

  const newPdf = {
    title,
    type,
    target,
    shortTitle,
    publishDate,
    ver,
    pagesCount,
    prevVer,
    premiereTag,
    archived,
  };
  try {
    await Pdf.findByIdAndUpdate(id, newPdf);
    const updatedPdf = await Pdf.findById(id);
    return res.json({
      result: 'success',
      msg: 'Zmodyfikowano instrukcję.',
      data: updatedPdf,
    });
  } catch (error) {
    console.log(error);
  }
});

//delete Pdf
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const pdf = Pdf.find({ _id: id });
  if (!pdf) {
    return res.json({
      result: 'error',
      msg: 'Brak instrukcji o podanym id.',
    });
  } else {
    await Pdf.findByIdAndRemove(id);
    return res.json({
      result: 'success',
      msg: 'Usunięto instrukcję.',
    });
  }
});

//@route PUT /add/:id
//@desc Add to sort of pdf
//@auth private

router.put('/add/:id', async (req, res) => {
  try {
    const curPdf = await Pdf.findById(req.params.id);

    const { target, type, archived } = curPdf;


    const allTypepdfs = await Pdf.find({ type, target, archived });

    if (curPdf.order === allTypepdfs.length) {
      return res.json({
        result: 'error',
        msg: 'Nie można przesunąć ostatniego elementu w dół !!!',
      });
    }

    const curOrder = curPdf.order;

    let upPdf = await Pdf.findOneAndUpdate(
      { order: curOrder + 1, type, target, archived },
      { $set: { order: curOrder } }
    );

    const newCurPdf = await Pdf.findByIdAndUpdate(req.params.id, {
      $set: {
        order: curOrder + 1,
      },
    });

    res.json(upPdf);
  } catch (err) {
    console.log(err.message);
  }
});
router.put('/substract/:id', async (req, res) => {
  try {
    const curPdf = await Pdf.findById(req.params.id);

    const { target, type, archived } = curPdf;

    const allTypepdfs = await Pdf.find({ type, target, archived });

    if (curPdf.order === 1) {
      return res.json({
        result: 'error',
        msg: 'Nie można przesunąć pierwszego elementu w górę!!!',
      });
    }

    const curOrder = curPdf.order;

    let upPdf = await Pdf.findOneAndUpdate(
      { order: curOrder - 1, type, target, archived },
      { $set: { order: curOrder } }
    );

    const newCurPdf = await Pdf.findByIdAndUpdate(req.params.id, {
      $set: {
        order: curOrder - 1,
      },
    });

    res.json({ msg: 'Dokonano zmiany', result: 'info' });
  } catch (err) {

    res.json({msg:'Coś poszło nie tak', result:'warning'})
    console.log(err.message);
  }
});

module.exports = router;
