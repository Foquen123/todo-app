'use client';

import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import Spinner from '../common/Spinner/Spinner';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: IProps) {
  const [isLoading, setIsLoading] = useState(false);
  const googleSignIn = async () => {
    setIsLoading(true);
    await authClient.signIn.social({
      /**
       * The social provider ID
       * @example "github", "google", "apple"
       */
      provider: 'google',
      /**
       * A URL to redirect after the user authenticates with the provider
       * @default "/"
       */
      callbackURL: '/',
      newUserCallbackURL: '/',
      errorCallbackURL: '/',

      /**
       * disable the automatic redirect to the provider.
       * @default false
       */
      // disableRedirect: true,
    });
    setIsLoading(false);
  };

  return (
    <>
      <div
        className="transition-all absolute z-50 w-0 h-0 p-10"
        style={{
          opacity: isOpen ? '100%' : '0%',
          pointerEvents: isOpen ? 'all' : 'none',
          // display: isOpen ? 'inherit' : 'none',
        }}
      >
        <div
          className="fixed w-screen h-screen top-0 left-0 z-40 bg-black/25 transition-all"
          onClick={onClose}
        ></div>
        <div
          className="fixed bg-neutral-800 z-50 p-2.5 rounded-lg max-w-100 w-full max-[450px]:max-w-[80%]"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="flex flex-col gap-2.5  ">
            <h3 className="text-white">Вход в аккаунт</h3>
            <button
              disabled={isLoading}
              onClick={googleSignIn}
              className="flex gap-2.5 rounded-lg p-2.5 border border-neutral-500 text-white cursor-pointer hover:bg-neutral-500 transition-all justify-center items-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.36068 0.789371C5.9627 1.62125 3.89469 3.20018 2.46041 5.29425C1.02612 7.38832 0.30116 9.88714 0.392005 12.4237C0.482851 14.9602 1.38472 17.4008 2.96513 19.3869C4.54555 21.373 6.72121 22.7999 9.17255 23.4581C11.1599 23.9709 13.2421 23.9934 15.2401 23.5237C17.05 23.1172 18.7234 22.2476 20.0963 21C21.5252 19.6619 22.5624 17.9596 23.0963 16.0762C23.6765 14.0281 23.7797 11.8743 23.3982 9.78H12.2382V14.4094H18.7013C18.5721 15.1477 18.2953 15.8524 17.8875 16.4813C17.4796 17.1102 16.949 17.6503 16.3276 18.0694C15.5384 18.5916 14.6487 18.9429 13.7157 19.1006C12.7799 19.2747 11.8202 19.2747 10.8844 19.1006C9.93596 18.9047 9.03875 18.5133 8.25005 17.9512C6.98283 17.0542 6.03132 15.7799 5.5313 14.31C5.02297 12.8126 5.02297 11.1893 5.5313 9.69187C5.88722 8.64228 6.47561 7.68663 7.25255 6.89625C8.14166 5.97515 9.2673 5.31674 10.506 4.99326C11.7446 4.66979 13.0485 4.69374 14.2744 5.0625C15.2322 5.35635 16.108 5.87002 16.8319 6.5625C17.5607 5.8375 18.2882 5.11062 19.0144 4.38187C19.3894 3.99 19.7982 3.61687 20.1676 3.21562C19.0623 2.18722 17.765 1.38694 16.3501 0.860621C13.7732 -0.0750226 10.9538 -0.100167 8.36068 0.789371V0.789371Z"
                  fill="white"
                />
                <path
                  d="M8.36058 0.789367C10.9535 -0.100776 13.7729 -0.0762934 16.35 0.858742C17.7652 1.38864 19.0619 2.19277 20.1656 3.22499C19.7906 3.62624 19.395 4.00124 19.0125 4.39124C18.285 5.11749 17.5581 5.84124 16.8318 6.56249C16.1079 5.87001 15.2321 5.35635 14.2743 5.06249C13.0488 4.69244 11.745 4.66711 10.506 4.98926C9.26699 5.31141 8.14067 5.96861 7.25058 6.88874C6.47364 7.67912 5.88525 8.63477 5.52933 9.68437L1.64246 6.67499C3.03372 3.91604 5.44261 1.80566 8.36058 0.789367V0.789367Z"
                  fill="#E33629"
                />
                <path
                  d="M0.611279 9.65624C0.820041 8.62081 1.16689 7.6181 1.64253 6.67499L5.5294 9.69186C5.02107 11.1893 5.02107 12.8126 5.5294 14.31C4.2344 15.31 2.93878 16.315 1.64253 17.325C0.452186 14.9556 0.0891526 12.2559 0.611279 9.65624V9.65624Z"
                  fill="#F8BD00"
                />
                <path
                  d="M12.2381 9.77814H23.3981C23.7797 11.8724 23.6764 14.0262 23.0963 16.0744C22.5623 17.9578 21.5252 19.66 20.0963 20.9981C18.8419 20.0194 17.5819 19.0481 16.3275 18.0694C16.9494 17.6499 17.4802 17.1092 17.8881 16.4796C18.296 15.8501 18.5726 15.1447 18.7013 14.4056H12.2381C12.2363 12.8644 12.2381 11.3213 12.2381 9.77814V9.77814Z"
                  fill="#587DBD"
                />
                <path
                  d="M1.64062 17.325C2.93688 16.325 4.2325 15.32 5.5275 14.31C6.02851 15.7804 6.98138 17.0548 8.25 17.9512C9.04116 18.5107 9.9403 18.899 10.89 19.0912C11.8257 19.2653 12.7855 19.2653 13.7213 19.0912C14.6543 18.9335 15.544 18.5823 16.3331 18.06C17.5875 19.0387 18.8475 20.01 20.1019 20.9887C18.7292 22.237 17.0558 23.1073 15.2456 23.5144C13.2476 23.9841 11.1655 23.9616 9.17813 23.4487C7.60632 23.0291 6.13814 22.2892 4.86563 21.2756C3.51886 20.2062 2.41882 18.8586 1.64062 17.325V17.325Z"
                  fill="#319F43"
                />
              </svg>
              Войти с помощью Google
              {isLoading && <Spinner></Spinner>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
