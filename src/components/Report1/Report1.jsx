import React, { useState, useCallback, useEffect, useRef } from "react";

import styled from "styled-components";
import {
  Field,
  SelectField,
  Option,
  DateTimeDateInput,
  DateTimeTimeInput,
  T,
  Modal,
  ModalTitle,
  ModalContent,
  Button,
  Table,
} from "@admiral-ds/react-ui";
//-----

//-----
// api
import withApi, { apiPropTypes } from "../../hocs/withApi";
import InstrumentsQuery from "../../services/queries/InstrumentsQuery";
import StatusesQuery from "../../services/queries/StatusesQuery";
import OrdersQuery from "../../services/queries/OrdersQuery";

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: horizontal;
  padding: 8px;
  > * {
    margin-bottom: 24px;
    min-width: 300px;
  }
  ,
  > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  max-width: 300px;
`;

const MAX_INSTRUMENTS = 10;

function Report1({ api }) {
  // state for data init - wait while required data will be loaded
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: undefined,
  });

  //
  const [filterState, setFilterState] = useState(() => ({
    status: [],
    orders: [],
    startDate: "12.12.2022",
    startTime: "10:10",
    endDate: "12.12.2023",
    endTime: "10:10",
  }));
  //----------

  //----------
  // instruments state
  const [instrumentsState, setInstrumentsState] = useState(() => ({
    options: [], // options
    isLoading: false, // loading state
    inputText: "", // user input for search
    searchText: "", // actual seach text, after input timeout elapsed
    value: "", // selected value
  }));

  const [opened, setOpened] = React.useState(false);

  // instruments search
  const searchApplyTimeout = useRef();
  const handleInstrumentInputChange = useCallback((value) => {
    if (searchApplyTimeout.current != null)
      clearTimeout(searchApplyTimeout.current);

    const inputText = value;
    setInstrumentsState((state) => ({ ...state, inputText }));
    searchApplyTimeout.current = setTimeout(() => {
      clearTimeout(searchApplyTimeout.current);
      // apply search text
      setInstrumentsState((state) => ({ ...state, searchText: inputText }));
    }, 300 /* wait 300 ms for input completion */);
  }, []);

  useEffect(() => {
    (async () => {
      if (instrumentsState.searchText.trim() === "") {
        const instruments = await api.query.execute(
          new InstrumentsQuery(instrumentsState.searchText)
        );
        setInstrumentsState((state) => ({
          ...state,
          isLoading: false,
          options: mapInstruments2Options(
            instruments,
            instrumentsState.searchText.trim(),
            MAX_INSTRUMENTS
          ),

          // instruments.slice(0, 4).map((i) => ({
          //   value: i.id.toString(),
          //   text: i.name,
          // })),
        }));
      } else if (instrumentsState.searchText.trim() !== "") {
        setInstrumentsState((state) => ({ ...state, isLoading: true }));
        try {
          const instruments = await api.query.execute(
            new InstrumentsQuery(instrumentsState.searchText)
          );
          setInstrumentsState((state) => ({
            ...state,
            isLoading: false,
            options: mapInstruments2Options(
              instruments,
              instrumentsState.searchText.trim(),
              MAX_INSTRUMENTS
            ),
            // options: instruments.slice(0, 4).map((i) => ({
            //   value: i.id.toString(),
            //   text: i.isin != null ? `${i.name} / ${i.isin}` : i.name,
            // })),
          }));
        } catch (e) {
          setInstrumentsState((state) => ({
            ...state,
            isLoading: false,
            options: [],
          }));
          // !!! for simplicity only -> output error to user
          console.error(e.message);
        }
      }
    })();
  }, [api.query, instrumentsState.searchText]);
  //--

  // data init
  const fetchData = useCallback(async () => {
    //setState((state) => ({ ...state, loading: true }));
    try {
      let orders = await api.query.execute(new OrdersQuery());
      let statuses = await api.query.execute(new StatusesQuery());

      setState((state) => ({
        ...state,
        loading: false,
        error: null,
        data: { statuses, orders },
      }));
    } catch (e) {
      setState((state) => ({
        ...state,
        loading: false,
        error: e,
        data: null,
      }));
    }
  }, [api.query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  // test orders

  // show loading state (spinner or something similar) while required data is loading
  if (state.loading) return <div>Loading data...</div>;

  // show error if required data loading failed
  if (state.error) return <div>Error: {state.error.message}</div>;

  // --
  const ordersOptions = [
    { value: "0", text: "--- Любой ---" },
    ...state.data.orders.map((s) => ({
      value: s.id.toString(),
      text: s.ordersNumber,
    })),
  ];
  // build statuses options with extra option
  const statusesOptions = [
    { value: "0", text: "--- Любой ---" },
    ...state.data.statuses.map((s) => ({
      value: s.id.toString(),
      text: s.statusName,
    })),
  ];

  return (
    <div>
      <T font="Main/L">Журнал регистрации поручений.</T>
      <DisplayContainer>
        <Button onClick={() => setOpened(true)}>Параметры</Button>
        {opened && (
          <Modal
            aria-labelledby="modal-title"
            onClose={() => {
              setOpened(false);
            }}
            style={{ width: 1500 }}
          >
            <ModalTitle id="modal-title">Параметры</ModalTitle>
            <ModalContent>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                <Field label="Дата начала периода">
                  <FlexDiv>
                    <DateTimeDateInput
                      value={filterState.startDate}
                      onChange={(el) =>
                        setFilterState((prevState) => ({
                          ...prevState,
                          startDate: el.target.value,
                        }))
                      }
                    />
                    <DateTimeTimeInput
                      value={filterState.startTime}
                      onChange={(el) =>
                        setFilterState((prevState) => ({
                          ...prevState,
                          startTime: el.target.value,
                        }))
                      }
                    />
                  </FlexDiv>
                </Field>
                <Field label="Дата окончания периода">
                  <FlexDiv>
                    <DateTimeDateInput
                      value={filterState.endDate}
                      onChange={(el) =>
                        setFilterState((prevState) => ({
                          ...prevState,
                          endDate: el.target.value,
                        }))
                      }
                    />
                    <DateTimeTimeInput
                      value={filterState.endTime}
                      onChange={(el) =>
                        setFilterState((prevState) => ({
                          ...prevState,
                          endTime: el.target.value,
                        }))
                      }
                    />
                  </FlexDiv>
                </Field>
                <Field label="Поручение">
                  <SelectField
                    value={filterState.orders}
                    multiple
                    displayClearIcon
                    onChange={(el) =>
                      setFilterState((prevState) => ({
                        ...prevState,
                        orders: Array.from(
                          el.target.selectedOptions,
                          (o) => o.value
                        ),
                      }))
                    }
                  >
                    {ordersOptions.map((o) => (
                      <Option key={o.value} value={o.value}>
                        {o.text}
                      </Option>
                    ))}
                  </SelectField>
                </Field>
                <Field label="Статус">
                  <SelectField
                    value={filterState.status}
                    multiple
                    displayClearIcon
                    onChange={(el) =>
                      setFilterState((prevState) => ({
                        ...prevState,
                        status: Array.from(
                          el.target.selectedOptions,
                          (o) => o.value
                        ),
                      }))
                    }
                  >
                    {statusesOptions.map((o) => (
                      <Option key={o.value} value={o.value}>
                        {o.text}
                      </Option>
                    ))}
                  </SelectField>
                </Field>

                <Field label="Инструмент">
                  <SelectField
                    mode="searchSelect"
                    value={instrumentsState.value}
                    // multiple
                    displayClearIcon
                    onChange={(el) =>
                      setInstrumentsState((prevState) => ({
                        ...prevState,
                        value: el.target.value,
                        //status: Array.from(el.target.selectedOptions, (o) => o.value),
                      }))
                    }
                    onInputChange={(el) =>
                      handleInstrumentInputChange(el.target.value)
                    }
                    isLoading={instrumentsState.isLoading}
                    inputValue={instrumentsState.inputText}
                    width="300px"
                  >
                    {instrumentsState.options.map((o) => (
                      <Option key={o.value} value={o.value}>
                        {o.text}
                      </Option>
                    ))}
                  </SelectField>
                </Field>
              </div>
            </ModalContent>
          </Modal>
        )}

        <Field label="Инструмент">
          <SelectField
            mode="searchSelect"
            value={instrumentsState.value}
            // multiple
            displayClearIcon
            onChange={(el) =>
              setInstrumentsState((prevState) => ({
                ...prevState,
                value: el.target.value,
                //status: Array.from(el.target.selectedOptions, (o) => o.value),
              }))
            }
            onInputChange={(el) => handleInstrumentInputChange(el.target.value)}
            isLoading={instrumentsState.isLoading}
            inputValue={instrumentsState.inputText}
            width="300px"
          >
            {instrumentsState.options.map((o) => (
              <Option key={o.value} value={o.value}>
                {o.text}
              </Option>
            ))}
          </SelectField>
        </Field>
      </DisplayContainer>
    </div>
  );
}

const instr2value = (id, text) => `${id}_${text}`;
//const value2id = (value) => value.substr(0, value.indexOf("_"));

function mapInstruments2Options(instruments, filter, maxOptionsVisible = 10) {
  const options = [];
  const lFilter = filter.toLowerCase();
  // найдено элементов
  let optionsDone = 0;
  for (let i = 0; i < instruments.length; i++) {
    const instr = instruments[i];
    // name
    if (instr.name != null && instr.name.toLowerCase().indexOf(lFilter) > -1) {
      options.push({
        value: instr2value(instr.id, instr.name),
        text: instr.name,
      });

      if (++optionsDone >= maxOptionsVisible) break;
    }
    // isin
    if (
      instr.isin !== null &&
      instr.isin !== "" &&
      (instr.name == null ||
        instr.name.toLowerCase() !== instr.isin.toLowerCase()) && // если не совпадает с name
      instr.isin.toLowerCase().indexOf(lFilter) > -1
    ) {
      options.push({
        value: instr2value(instr.id, instr.isin),
        text: instr.isin,
      });

      if (++optionsDone >= maxOptionsVisible) break;
    }
  }
  return options.sort((a, b) =>
    a.text.toLowerCase().localeCompare(b.text.toLowerCase())
  );
}

Report1.propTypes = {
  ...apiPropTypes,
};

export default withApi(Report1);
