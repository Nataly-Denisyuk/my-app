import React, { useState, useCallback, useEffect, useRef } from "react";

import styled from "styled-components";
import { Field, SelectField, Option } from "@admiral-ds/react-ui";

// api
import withApi, { apiPropTypes } from "../../hocs/withApi";
import InstrumentsQuery from "../../services/queries/InstrumentsQuery";
import StatusesQuery from "../../services/queries/StatusesQuery";

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

function Report1({ api }) {
  // state for data init - wait while required data will be loaded
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: undefined,
  });

  //
  const [filterState, setFilterState] = useState(() => ({
    status: "0",
  }));

  // instruments state
  const [instrumentsState, setInstrumentsState] = useState(() => ({
    options: [], // options
    isLoading: false, // loading state
    inputText: "", // user input for search
    searchText: "", // actual seach text, after input timeout elapsed
    value: "", // selected value
  }));

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
          options: instruments.slice(0, 4).map((i) => ({
            value: i.id.toString(),
            text: i.name,
          })),
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
            options: instruments.slice(0, 4).map((i) => ({
              value: i.id.toString(),
              text: i.name,
            })),
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
    //setState(state => ({...state, loading: true}))
    try {
      let statuses = await api.query.execute(new StatusesQuery());
      setState((state) => ({
        ...state,
        loading: false,
        error: null,
        data: { statuses },
      }));
    } catch (e) {
      setState((state) => ({ ...state, loading: false, error: e, data: null }));
    }
  }, [api.query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // show loading state (spinner or something similar) while required data is loading
  if (state.loading) return <div>Loading data...</div>;

  // show error if required data loading failed
  if (state.error) return <div>Error: {state.error.message}</div>;

  // --

  // build statuses options with extra option
  const statusesOptions = [
    { value: "0", text: "--- Любой ---" },
    ...state.data.statuses.map((s) => ({
      value: s.id.toString(),
      text: s.statusName,
    })),
  ];

  return (
    <DisplayContainer>
      <Field label="Статус">
        <SelectField
          value={filterState.status}
          onChange={(el) =>
            setFilterState((prevState) => ({
              ...prevState,
              status: el.target.value,
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
          onChange={(el) =>
            setInstrumentsState((prevState) => ({
              ...prevState,
              value: el.target.value,
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
  );
}

Report1.propTypes = {
  ...apiPropTypes,
};

export default withApi(Report1);
