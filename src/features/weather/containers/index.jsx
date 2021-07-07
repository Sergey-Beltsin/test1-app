import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserCity,
  getWeatherByCity, resetError,
  setCity,
  setIsCityFetched,
  setIsWeatherLoading,
} from '../store';
import {
  Input,
  Loader,
  Modal,
  Tooltip,
} from '../../../ui/atoms';
import { DangerIcon, EditIcon } from '../../../lib/icons';

const checkKeyboard = (event) => {
  const re = /\d|\w|[.$@*\\/+\-^!()[\]~%&=?><{}"',:;_]/g;
  const a = event.key.match(re);
  return a != null;
};

export const Weather = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const isCityFetched = useSelector((state) => state.weather.isCityFetched);
  const weather = useSelector((state) => state.weather.weather);
  const isWeatherLoading = useSelector((state) => state.weather.isWeatherLoading);
  const fetchError = useSelector((state) => state.weather.error);
  const fetchErrorsCount = useSelector((state) => state.weather.errorsCount);
  const inputRef = useRef(null);
  const [isModal, setIsModal] = useState(false);
  const [isEditInput, setIsEditInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [wrongKeyboardLayoutError, setWrongKeyboardLayoutError] = useState('');
  const [isFetchErrorModal, setIsFetchErrorModal] = useState(false);

  useEffect(() => {
    if (!city) {
      dispatch(getUserCity());
    }
    return () => {
      dispatch(resetError());
    };
  }, []);

  useEffect(() => {
    if (city && !isCityFetched) {
      setIsModal(true);
      setInputValue(city);
      dispatch(setIsCityFetched(true));
    }
  }, [city]);

  useEffect(() => {
    if (isEditInput) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (fetchError) {
      setIsFetchErrorModal(true);
      setIsEditInput(true);
      setInputValue('');
    } else {
      setIsFetchErrorModal(false);
    }
  }, [fetchErrorsCount]);

  const onClickWrongCity = () => {
    dispatch(setCity(''));
    setIsModal(false);
    setIsEditInput(true);
    setInputValue('');
  };

  const onClickCityOk = () => {
    setIsModal(false);
    dispatch(setIsWeatherLoading(true));
    dispatch(getWeatherByCity(city));
  };

  const onKeyDown = (event) => {
    if (!checkKeyboard(event)) {
      setWrongKeyboardLayoutError('Для наилучшего соответствия лучше набирать город на английском языке.');
      return;
    }
    setWrongKeyboardLayoutError('');
  };

  const onCloseSearch = () => {
    if (city) {
      setIsEditInput(false);
      setError('');
      return;
    }
    setError('Поле \'Город\' не может быть пустым');
  };

  const onClickSearch = (currentCity) => {
    if (currentCity) {
      if (currentCity !== city) {
        dispatch(setIsWeatherLoading(true));
        dispatch(getWeatherByCity(currentCity));
      }
      setIsEditInput(false);
      setError('');
      return;
    }
    setError('Поле \'Город\' не может быть пустым');
  };

  const onInputChange = (value) => {
    setInputValue(value);
    if (value) {
      setError('');
    }
  };

  return (
    <div className="weather__wrapper">
      <div className="weather__city">
        Город:
        {isEditInput ? (
          <>
            <Input
              searchable
              value={inputValue}
              onKeyDown={onKeyDown}
              searchButtonText="Показать погоду"
              onChange={onInputChange}
              ref={inputRef}
              onClose={onCloseSearch}
              onClickSearch={onClickSearch}
            />
            <Tooltip
              text={error || wrongKeyboardLayoutError}
              isVisible={error || wrongKeyboardLayoutError}
            >
              <DangerIcon />
            </Tooltip>
          </>
        ) : (
          <div className="weather__city__wrapper">
            {city}
            <button
              className="weather__city__icon"
              type="button"
              onClick={() => {
                setIsEditInput(true);
                setInputValue(city);
              }}
            >
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      {isLoading
        ? <Loader isFullScreen />
        : (
          <>
            <Modal
              isOpen={isModal}
              onClose={onClickWrongCity}
              title="Это ваш город?"
            >
              <div className="weather__modal__wrapper">
                <span className="weather__modal__descr">
                  {city}
                  {' '}
                  - это ваш город?
                </span>
                <div className="weather__modal__buttons">
                  <button
                    className="weather__modal__buttons__button"
                    type="button"
                    onClick={onClickCityOk}
                  >
                    Все верно
                  </button>
                  <button
                    className="weather__modal__buttons__button weather__modal__buttons__button--secondary"
                    type="button"
                    onClick={onClickWrongCity}
                  >
                    Нет
                  </button>
                </div>
              </div>
            </Modal>
            <Modal
              isOpen={isFetchErrorModal}
              onClose={() => setIsFetchErrorModal('')}
              icon={<DangerIcon />}
              title="Ошибка!"
            >
              {fetchError}
            </Modal>
            <div className="weather__main">
              {weather && !isWeatherLoading ? (
                <>
                  <img
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                    className="weather__main__icon"
                    width={128}
                  />
                  <span className="weather__main__temp">
                    {weather.current.temp_c}
                    °C
                  </span>
                  <span className="weather__main__descr">
                    {weather.current.condition.text}
                  </span>
                  <div className="weather__main__forecast">
                    <div className="weather__main__forecast__wrapper">
                      <span className="weather__main__forecast__temp weather__main__forecast__temp--min">
                        {weather.forecast.forecastday[0].day.mintemp_c.toFixed(0)}
                      </span>
                      <span className="weather__main__forecast__descr">
                        min
                      </span>
                    </div>
                    <div className="weather__main__forecast__wrapper">
                      <span className="weather__main__forecast__temp">
                        {weather.forecast.forecastday[0].day.maxtemp_c.toFixed(0)}
                      </span>
                      <span className="weather__main__forecast__descr">
                        max
                      </span>
                    </div>
                  </div>
                </>
              ) : isWeatherLoading && <Loader />}
            </div>
          </>
        )}
    </div>
  );
};
