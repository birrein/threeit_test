import axios from 'axios';
import {API_URL} from '../utils/constants';

export async function getPollsByEmail(email) {
  try {
    const res = await axios.get(`${API_URL}/getPollsByEmail/${email}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function insertPoll({musicGenre, email}) {
  try {
    const res = await axios.post(`${API_URL}/insertPoll`, {
      musicGenre,
      email,
    });
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getResults() {
  try {
    const res = await axios.get(`${API_URL}/getAllPolls`);
    const resGrouped = res.data.reduce((acc, curr) => {
      if (acc[curr.musicGenre]) {
        acc[curr.musicGenre]++;
      } else {
        acc[curr.musicGenre] = 1;
      }
      return acc;
    }, {});

    const resultsFormated = [];
    for (let genre in resGrouped) {
      resultsFormated.push({
        genre,
        votes: resGrouped[genre],
      });
    }

    return resultsFormated;
  } catch (error) {
    console.log(error);
  }
}
