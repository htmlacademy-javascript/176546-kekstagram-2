const NAMES = [
  'Иван',
  'Сергей',
  'Мария',
  'Александр',
  'Виктор',
  'Юлия',
  'Ксения',
  'Людмила',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Прикольное фото',
  'Смешное фото',
  'Грустное фото',
  'Странное фото',
  'Страшное фото',
  'Шокирующее фото',
];

const PHOTOS_RANGE_START = 1;
const PHOTOS_RANGE_END = 25;

const COMMENTS_RANGE_START = 0;
const COMMENTS_RANGE_END = 30;

const AVATAR_RANGE_END = 6;
const LIKES_RANGE_START = 15;
const LIKES_RANGE_END = 200;

const commentsArray = Array.from({ length: COMMENTS_RANGE_END * PHOTOS_RANGE_END}, (_, i) => i + 1);
const previousComments = [];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (arr) =>
  () => {
    let currentValue = getRandomArrayElement(arr);
    if (previousComments.length >= (arr.length + 1)) {
      return null;
    }

    while (previousComments.includes(currentValue)) {
      currentValue = getRandomArrayElement(arr);
    }

    previousComments.push(currentValue);

    return currentValue;
  };

const generateCommentId = createRandomIdFromRangeGenerator(commentsArray);

const createComment = (commentsId) => ({
  id: commentsId,
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_RANGE_END)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)} ${getRandomArrayElement(MESSAGES)}`,
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (photoId) => ({
  id: photoId,
  url: `photos/${photoId}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_RANGE_START, LIKES_RANGE_END),
  comments: Array.from({ length: getRandomInteger(COMMENTS_RANGE_START, COMMENTS_RANGE_END)}, () => createComment(generateCommentId())),
});

const generatePhotos = () => {
  const photosArray = [];

  for (let photoId = PHOTOS_RANGE_START; photoId <= PHOTOS_RANGE_END; photoId++) {
    photosArray.push((createPhoto(photoId)));
  }

  return photosArray;
};

generatePhotos();
