const express = require('express');
const router = express.Router();
const Film = require('../models/Film');

// Get all films
router.get('/', async (req, res) => {
  try {
    const films = await Film.find().sort({ order: 1 });

    if (films.length === 0) {
      return res.status(400).json({
        result: 'warning',
        msg: 'Brak filmów do wyświetlenia',
      });
    }

    res.status(200).json({
      result: 'success',
      msg: 'Pobrano informacje o wszystkich filmach.',
      count: films.length,
      data: films,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Server error [500]',
      result: 'error',
      error: 'Server error',
    });
  }
});

// Get one film
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const film = await Film.findById(id);

    if (film === null) {
      return res.status(400).json({
        result: 'warning',
        msg: 'Brak filmu o takim id',
      });
    }

    res.status(200).json({
      result: 'success',
      msg: 'Pobrano informacje o filmie.',
      data: film,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Server errror [500]: ${error.message}`,
      result: 'error',
      error: 'Server error',
    });
  }
});

// create a film
router.post('/', async (req, res) => {
  const { title, target, linkYT, premiereTag, archived } = req.body;

  try {
    if (
      title === '' ||
      target === '' ||
      linkYT === '' ||
      premiereTag === '' ||
      archived === ''
    ) {
      return res.json({
        result: 'error',
        msg: 'Nie uzupełniono wszystkich wymaganych pól.',
      });
    }
    const allTypefilms = await Film.find({ target, archived });

    const requiredFields = {
      title,

      target,
      linkYT,
      premiereTag,
      archived,
      order: allTypefilms.length + 1,
    };

    await Film.create(requiredFields);

    return res.json({
      result: 'success',
      msg: 'Utworzono nowy film.',
    });
  } catch (error) {
    console.log(error);
  }
});

// edit

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, target, linkYT, premiereTag, archived } = req.body;

  const newFilm = {
    title,
    target,
    linkYT,
    premiereTag,
    archived,
  };
  try {
    console.log(title);
    if (
      title === '' ||
      title === undefined ||
      target === '' ||
      target === undefined ||
      linkYT === '' ||
      linkYT === undefined ||
      premiereTag === '' ||
      premiereTag === undefined ||
      archived === '' ||
      archived === undefined
    ) {
      return res.json({
        result: 'error',
        msg: 'Nie uzupełniono wszystkich wymaganych pól.',
      });
    }

    const updatedFilm = await Film.findByIdAndUpdate(id, newFilm);

    if (!updatedFilm) {
      return res.status(400).json({
        result: 'warning',
        msg: 'Brak filmu o wybranym id',
      });
    }

    // const updatedFilm = await Film.findById(id);
    return res.json({
      result: 'success',
      msg: 'Zmodyfikowano film',
      data: updatedFilm,
    });
  } catch (error) {
    console.log(error);
  }
});

//delete Film
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const film = await Film.find({ _id: id });

  if (film.length === 0) {
    return res.json({
      result: 'error',
      msg: 'Brak filmu o podanym id.',
    });
  } else {
    await Film.findByIdAndRemove(id);
    return res.json({
      result: 'success',
      msg: 'Usunięto film.',
    });
  }
});

//@route PUT /add/:id
//@desc Add to sort of film
//@auth private

router.put('/add/:id', async (req, res) => {
  try {
    const curFilm = await Film.findById(req.params.id);

    const { target, archived } = curFilm;

    const allTypefilms = await Film.find({ target, archived });

    if (curFilm.order === allTypefilms.length) {
      return res.json({
        result: 'error',
        msg: 'Nie można przesunąć ostatniego elementu w dół !!!',
      });
    }

    const curOrder = curFilm.order;

    let upFilm = await Film.findOneAndUpdate(
      { order: curOrder + 1, target, archived },
      { $set: { order: curOrder } }
    );

    const newCurFilm = await Film.findByIdAndUpdate(req.params.id, {
      $set: {
        order: curOrder + 1,
      },
    });

    res.json(upFilm);
  } catch (err) {
    console.log(err.message);
  }
});
router.put('/substract/:id', async (req, res) => {
  try {
    const curFilm = await Film.findById(req.params.id);

    const { target, archived } = curFilm;

    const allTypefilms = await Film.find({ target, archived });

    if (curFilm.order === 1) {
      return res.json({
        result: 'error',
        msg: 'Nie można przesunąć pierwszego elementu w górę!!!',
      });
    }

    const curOrder = curFilm.order;

    let upFilm = await Film.findOneAndUpdate(
      { order: curOrder - 1, target, archived },
      { $set: { order: curOrder } }
    );

    const newCurFilm = await Film.findByIdAndUpdate(req.params.id, {
      $set: {
        order: curOrder - 1,
      },
    });

    res.json({ msg: 'Dokonano zmian', result: 'info' });
  } catch (err) {
    res.json({ msg: 'Coś poszło nie tak', result: 'warning' });
    console.log(err.message);
  }
});

module.exports = router;
