import axios from "axios";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

import {comparisonTableList, initialInput, initialResult} from "../utils/constants.js";

const getDefaultState = () => ({
   headerValue: "Новый проект",
   calculationsList: [],
   currentInputData: initialInput,
   currentResult: initialResult,

   comparisonTable: [],

   tableName: "",
   isHeaderEditing: false,
   showOptions: false,

   isPending: false,
   isError: false,
   errorMessage: "",
});

export const useCalculatorStore = create(
   persist(
      (set, get) => ({
         ...getDefaultState(),
         setHeaderValue: (value) => set({headerValue: value}),
         setCalculationList: (data) => set({calculationsList: data}),
         setCurrentInputData: (data) => set({currentInputData: data}),
         setCurrentResult: (data) => set({currentResult: data}),

         setComparisonTable: (data) => set({comparisonTable: data}),

         setTableName: (value) => set({tableName: value}),
         setIsHeaderEditing: (isHeaderEditing) => set({isHeaderEditing: isHeaderEditing}),
         setShowOptions: (show) => set({showOptions: show}),

         setIsPending: (isPending) => set({isPending: isPending}),
         setIsError: (isError) => set({isError: isError}),
         setErrorMessage: (errorMessage) => set({errorMessage: errorMessage}),

         toggleShowOptions: () => {
            const current = get().showOptions;
            set({showOptions: !current});
         },

         saveCurrentToListIfChanged: (list) => {
            const {headerValue, currentInputData, currentResult} = get();

            if (JSON.stringify(currentInputData) !== JSON.stringify(initialInput)) {
               const currentCalculation = {
                  id: Date.now(),
                  header: headerValue,
                  input: currentInputData,
                  result: currentResult,
               };
               return [currentCalculation, ...list];
            }
            return list;
         },

         handleClone: () => {
            const {headerValue, currentInputData, currentResult, calculationsList} = get();
            const currentCalculation = {
               id: Date.now(),
               header: headerValue,
               input: currentInputData,
               result: currentResult,
            };
            const newCalculationList = [currentCalculation, ...calculationsList];
            set({calculationsList: newCalculationList, showOptions: false});
         },

         getCurrentCalculation: () => {
            const {currentResult, currentInputData} = get();

            const flattenResults = Object.values(currentResult).map((result) => [result.title, result.value]);

            return [
               ...(Object.entries(currentInputData)),
               ...flattenResults
            ];
         },

         handleDownload: async (email, closeCallback, isEmailValidator) => {
            const {tableName, headerValue, comparisonTable} = get();

            if (!isEmailValidator(email)) {
               get().setIsError(true);
               get().setErrorMessage("Ой! Похоже, в адресе есть ошибка");
               return;
            } else {
               get().setIsError(false);
               get().setErrorMessage("");
            }

            const res = tableName === "comparison" ?
               comparisonTable :
               get().getCurrentCalculation();

            const reqBody = {
               email,
               title: tableName === "comparison" ? "comparison table" : headerValue,
               data: res,
            }
            try {
               set({isPending: true, isError: false, errorMessage: ""});

               await axios.post(`/api/download-file`, reqBody);
               closeCallback();
            } catch (e) {
               if (!e.response) {
                  e.message = "Нет соединения с сервером";
               }
               if (typeof e.response.data === "string" ||
                  e.response.data === null) {
                  e.message = "Упс, что-то пошло не так";
               } else {
                  e.message = e.response.data.message;
               }
               get().setIsError(true);
               get().setErrorMessage(e.message);
            } finally {
               set({isPending: false});
            }
         },
         
         handleDelete: () => {
            set({
               headerValue: "Новый проект",
               currentInputData: initialInput,
               currentResult: initialResult,
               showOptions: false,
            })
         },

         handleEditCalcListItem: (id) => {
            const {calculationsList} = get();
            const elemForEdit = calculationsList.find((item) => item.id === id);
            const filteredList = calculationsList.filter((item) => item.id !== id);

            let updatedList = get().saveCurrentToListIfChanged(filteredList);

            set({
               headerValue: elemForEdit.header,
               currentInputData: elemForEdit.input,
               currentResult: elemForEdit.result,
               calculationsList: updatedList,
            })
         },

         handleNewCalculation: () => {
            const {calculationsList} = get();

            const updatedList = get().saveCurrentToListIfChanged(calculationsList);

            set({
               calculationsList: updatedList,
               currentInputData: initialInput,
               currentResult: initialResult,
               headerValue: "Новый проект",
            });
         },

         getTableData: () => {
            const {calculationsList} = get();

            return [
               ['Расчет', ...comparisonTableList.map(f => `${f.title}\u00A0₽`)],
               ...calculationsList.map(calc => [
                  calc.header,
                  ...comparisonTableList.map(f => calc.result[f.id].value)
               ])
            ];
         },

      }),
      {
         name: 'calculator-storage',
         storage: createJSONStorage(() => localStorage),
         partialize: (state) => ({
            headerValue: state.headerValue,
            calculationsList: state.calculationsList,
            currentInputData: state.currentInputData,
            currentResult: state.currentResult,
         }),
      }
   )
);