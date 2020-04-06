const express = require('express');
const router = express.Router();
const Doc = require('../models/Doc');

// Get all docs
router.get('/', async (req, res) => {
  try {
    const docs = await Doc.find().sort({ order: 1 });
    res.status(200).json({
      result: 'success',
      msg: 'Pobrano informacje o wszystkich instrukcjach.',
      count: docs.length,
      data: docs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Server error',
    });
  }
});

// Get one doc
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Doc.findById(id);
    res.status(200).json({
      result: 'success',
      msg: 'Pobrano informacje o instrukcji.',
      data: doc,
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

// create a doc
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
    const allTypeDocs = await Doc.find({ target, type, archived });

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
      order: allTypeDocs.length + 1,
    };

    await Doc.create(requiredFields);

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

  const newDoc = {
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
    await Doc.findByIdAndUpdate(id, newDoc);
    const updatedDoc = await Doc.findById(id);
    return res.json({
      result: 'success',
      msg: 'Zmodyfikowano instrukcję.',
      data: updatedDoc,
    });
  } catch (error) {
    console.log(error);
  }
});

//delete Doc
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const doc = Doc.find({ _id: id });
  if (!doc) {
    return res.json({
      result: 'error',
      msg: 'Brak instrukcji o podanym id.',
    });
  } else {
    await Doc.findByIdAndRemove(id);
    return res.json({
      result: 'success',
      msg: 'Usunięto instrukcję.',
    });
  }
});

//@route PUT /add/:id
//@desc Add to sort of doc
//@auth private

router.put('/add/:id', async (req, res) => {
  try {
    const curDoc = await Doc.findById(req.params.id);

    const { target, type, archived } = curDoc;


    const allTypeDocs = await Doc.find({ type, target, archived });

    if (curDoc.order === allTypeDocs.length) {
      return res.json({
        result: 'error',
        msg: 'Nie można przesunąć ostatniego elementu w dół !!!',
      });
    }

    const curOrder = curDoc.order;

    let upDoc = await Doc.findOneAndUpdate(
      { order: curOrder + 1, type, target, archived },
      { $set: { order: curOrder } }
    );

    const newCurDoc = await Doc.findByIdAndUpdate(req.params.id, {
      $set: {
        order: curOrder + 1,
      },
    });

    res.json(upDoc);
  } catch (err) {
    console.log(err.message);
  }
});
router.put('/substract/:id', async (req, res) => {
  try {
    const curDoc = await Doc.findById(req.params.id);

    const { target, type, archived } = curDoc;

    const allTypeDocs = await Doc.find({ type, target, archived });

    if (curDoc.order === 1) {
      return res.json({
        result: 'error',
        msg: 'Nie można przesunąć pierwszego elementu w górę!!!',
      });
    }

    const curOrder = curDoc.order;

    let upDoc = await Doc.findOneAndUpdate(
      { order: curOrder - 1, type, target, archived },
      { $set: { order: curOrder } }
    );

    const newCurDoc = await Doc.findByIdAndUpdate(req.params.id, {
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
