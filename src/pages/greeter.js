import { useState, useEffect } from "react";
import { ethers } from "ethers";


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address

const greeterArtifact = require("../../public/contracts/Greeter.json");
const abi = greeterArtifact.abi;


export default function Home() {
    const [greeting, setGreeting] = useState("");
    const [newGreeting, setNewGreeting] = useState("");

    useEffect(() => {
        fetchGreeting();
    }, []);

    async function fetchGreeting() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, abi, provider);
                const data = await contract.greet();
                console.log("Fetched greeting:", data); // Log the fetched data
                setGreeting(data);
            } catch (err) {
                console.error("Error fetching greeting:", err);
            }
        } else {
            console.error("MetaMask is not installed!");
            alert("Please install MetaMask to interact with this dApp.");
        }
    }

    async function setGreetingHandler() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();

                const contract = new ethers.Contract(contractAddress, abi, signer);
                
                const transaction = await contract.setGreeting(newGreeting);
                await transaction.wait();
                fetchGreeting(); // Fetch the updated greeting
            } catch (err) {
                console.error("Error setting greeting:", err);
            }
        } else {
            console.error("MetaMask is not installed!");
            alert("Please install MetaMask to interact with this dApp.");
        }
    }

    return (
        <div>
            <h1>Greeter Contract</h1>
            <p>Current Greeting: {greeting}</p>
            <input
                type="text"
                value={newGreeting}
                onChange={(e) => setNewGreeting(e.target.value)}
                placeholder="Enter new greeting"
            />
            <button onClick={setGreetingHandler}>Set Greeting</button>
        </div>
    );
}