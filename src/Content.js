import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import countryList from "./CountryCode";

function Content() {

    const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
    async function fetchURL() {
        try {
            let response = await fetch(`${BASE_URL}/${fromCurr.toLowerCase()}.json`);
            let data = await response.json();
            let rate = data[fromCurr.toLowerCase()]
            for (let to in rate) {
                if (to === toCurr.toLowerCase()) {
                    setCurrValue(rate[to]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [inputValue, setInputValue] = useState(1);
    const [fromFlag, setFromFlag] = useState("");
    const [toFlag, setToFlag] = useState("");
    const [toCurr, setToCurr] = useState("");
    const [fromCurr, setFromCurr] = useState("");
    const [currValue, setCurrValue] = useState(1);


    async function setSelectDetail() {
        const selects = document.querySelectorAll("form select");
        for (let select of selects) {
            for (let country in countryList) {
                let option = document.createElement("option");
                option.innerText = country;
                option.value = country;
                if (select.name === "from" && country === "USD") {
                    option.selected = "selected";
                    setFromFlag(countryList[country]);
                    setFromCurr(country);
                } else if (select.name === "to" && country === "INR") {
                    option.selected = "selected";
                    setToFlag(countryList[country]);
                    setToCurr(country);
                }
                select.append(option);
                if (inputValue === "" || inputValue < 1) {
                    setInputValue(1);
                }
            }
        }
    }

    const fromFlagSet = () => {
        setFromFlag(countryList[fromCurr])
    }

    const toFlagSet = () => {
        setToFlag(countryList[toCurr])
    }

    useEffect(() => {
        setSelectDetail();
    }, [inputValue]);

    useEffect(() => {
        fromFlagSet();
        toFlagSet();
        fetchURL();
    }, [fromCurr, toCurr]);

    const handleInterchange = () =>{
        let intButton = document.querySelector("#interchange-button");
        intButton.classList.add("rotate");
        setTimeout(() => {
            intButton.classList.remove("rotate");
        },500);

        setFromCurr(toCurr);
        setToCurr(fromCurr);
        setFromFlag(toFlag);
        setToFlag(fromFlag);
    }

    return (
        <div id="content">
            <h3>
                Currency Converter
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <p>
                    Enter Amount
                </p>
                <input type="number" value={inputValue} required onChange={(e) => { setInputValue(e.target.value) }} />
                <div id="set-value">
                    <div className="selectors">
                        <p>
                            From
                        </p>
                        <div>
                            <img src={`https://flagsapi.com/${fromFlag}/flat/64.png`} alt="Flag-img" />
                            <select name="from" onChange={(e) => { setFromCurr(e.target.value) }}>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <button id="interchange-button" onClick={(e)=>{handleInterchange(e)}}>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                    </button>
                    <div className="selectors">
                        <p>
                            To
                        </p>
                        <div>
                            <img src={`https://flagsapi.com/${toFlag}/flat/64.png`} alt="Flag-img" />
                            <select name="to" onChange={(e) => { setToCurr(e.target.value) }}>
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
                <p id="value">
                    {`${inputValue} ${fromCurr} = ${inputValue * currValue} ${toCurr}`}
                </p>
            </form>
        </div>
    );
}

export default Content;