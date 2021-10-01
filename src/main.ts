import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import './style.css';

const dogUrl = 'https://dog.ceo/api/breeds/image/random';

const fetchIt = (url: string): Promise<string> =>
  pipe(
    TE.tryCatch(async () => {
      const res = await fetch(url);
      return res.json();
    }, E.toError),
    TE.fold<Error, { message: string }, any>(
      (err) => T.of(err),
      ({ message }) => T.of(message)
    )
  )();

// ==================
function img(url: string) {
  const _img = document.createElement('img');
  _img.src = url;
  return _img;
}

function render(node: HTMLImageElement) {
  const app = document.querySelector<HTMLDivElement>('#app');
  app!.appendChild(node);
  window.scrollTo(0, document.body.scrollHeight);
}

setInterval(() => {
  fetchIt(dogUrl).then((src) => render(img(src)));
}, 10000);

// ==================
