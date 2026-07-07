const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const uploadPhoto = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      if (preview.src && preview.src.startsWith('blob:')) {
        URL.revokeObjectURL(preview.src);
      }
      preview.src = URL.createObjectURL(file);
    }
  });
};

export { uploadPhoto };
