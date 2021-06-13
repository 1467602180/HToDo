export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const getFile = (dataUrl: string) => {
  try {
    let arr: string[] = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)?.[1];
    let bStr = atob(arr[1]);
    let n = bStr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    return null;
  }
};
