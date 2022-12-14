import {
    contractAddresses,
    abis,
  } from '../../../../constants/index'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const NftRandomImage = ({ tokenID }) => {
    let [cellSize, setCellSize] = useState();
    let [rotation, setRotation] = useState();
    let [translation, setTranslation] = useState();
    let [numberOfCells, setNumberOfCells] = useState();
    let [xRotationCenter, setXRotationCenter] = useState();
    let [yRotationCenter, setYRotationCenter] = useState();
    let [dataFetched, setDataFetched] = useState(false);

    useEffect(async () => {
        let donationContract
        try {
          let provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = await provider.getSigner()
    
          donationContract = new ethers.Contract(
            contractAddresses.donation,
            abis.donation,
            signer
          )
    
          let encryptedData = await donationContract.getHlaEncoded(tokenID);
          let majorRandomSeed = parseInt(encryptedData, 16)
          let numberOfCells = majorRandomSeed % 3 + 3;
          setNumberOfCells(numberOfCells);
          let randomSeeds = encryptedData.match(new RegExp('.{1,' + parseInt(encryptedData.length/numberOfCells) + '}', 'g'));
          let CellSizes = [];
          let Rotations = [];
          let boxLocations = [];
          let xRotationCenters = [];
          let yRotationCenters = [];
          console.log(randomSeeds)
          randomSeeds.forEach(seed => {
            let randomSeed = parseInt(seed, 16)
            CellSizes.push(((randomSeed % 5) + 5)/10);
            Rotations.push(randomSeed % 360);
            // SVG is bounded to 140x140, the maximum size a cell is roughly 55X65,
            // so a buffer space of about 40 should be enough, hence cells can only be
            // located within box of 100x100
            let boxLocation = (randomSeed % 80) + 1;
            boxLocations.push(boxLocation);
            console.log("Translation", boxLocation);      
            xRotationCenters.push(boxLocation + 39.5);
            yRotationCenters.push(boxLocation + 37.5);
          });
          setCellSize(CellSizes);
          setRotation(Rotations);
          setTranslation(boxLocations);  
          setXRotationCenter(xRotationCenters);
          setYRotationCenter(yRotationCenters);
          setDataFetched(true);
        } catch (e) {
          console.warn(e)
        }
      },[]);

  return (
    <>
    { dataFetched &&
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[...Array(numberOfCells)].map((_,i) =>
        <g key = {i} transform={"rotate("+ rotation[i] + " " + xRotationCenter[i] + " " + yRotationCenter[i] +") translate("+translation[i]+" "+translation[i]+") scale ("+cellSize[i]+")"}>
            <path d="M41.972 67.993c-.104.048-.209.139-.311.136-2.409-.058-4.82-.068-7.224-.212a43.892 43.892 0 0 1-4.998-.609c-2.965-.525-5.566-1.839-7.853-3.818-1.483-1.284-2.94-2.584-4.05-4.214-.559-.82-1.027-1.702-1.565-2.603l-.36.74c.24-1.1-.2-2.091-.478-3.115-.38-1.4-.775-2.8-1.043-4.223-.246-1.308-.344-2.644-.487-3.97-.122-1.136-.314-2.278-.296-3.414.034-2.179.178-4.357.318-6.532.063-.99.188-1.977.358-2.953.303-1.728.744-3.435.705-5.21.275.169.359.068.45-.227.627-2.014 1.298-4.013 1.918-6.028.572-1.86 1.416-3.566 2.684-5.049 1.196-1.399 2.354-2.832 3.897-3.887 2.312-1.58 4.856-2.598 7.57-3.22.182-.04.382-.004.572-.004.169.074.33.19.506.217 2.647.41 4.974 1.627 7.285 2.887-.5-.013-1.027.077-1.491-.058-1.614-.466-3.206-.107-4.775.127-3.006.446-5.745 1.662-8.164 3.49-1.725 1.301-3.207 2.876-3.955 4.983-.513 1.444-.88 2.945-1.472 4.355-1.468 3.502-2.093 7.205-2.604 10.92-.301 2.196-.27 4.44-.373 6.663-.096 2.043.173 4.054.616 6.042.924 4.158 2.471 7.976 5.735 10.917a15.13 15.13 0 0 0 4.438 2.813c2.915 1.196 5.999 1.524 9.088 1.68 2.401.12 4.82-.044 7.23-.08l-3.6 3.204.067.227 1.662.025Z" fill="#DBA3D0"/>
            <path d="M39.649 11.622c-2.46-1.288-4.939-2.534-7.757-2.954-.188-.027-.359-.147-.538-.223 6.112-.902 12.12-.437 18.027 1.306 2.08.614 3.79 1.822 5.383 3.192 2.504 2.154 4.647 4.577 5.46 7.804.45 1.788.715 3.622 1.013 5.445.431 2.634.874 5.27 1.205 7.917.327 2.608.596 5.228.747 7.85.163 2.82.2 5.65-.098 8.47-.283 2.66-.558 5.341-1.79 7.777-2.766 5.464-6.898 9.187-13.575 9.546-1.83.099-3.657.256-5.484.385-.59-.007-1.18-.017-1.768-.026l-.074-.232 3.833-3.272-.003-.002c2.749.08 5.34-.487 7.773-1.722 3-1.524 4.937-3.912 6.078-6.933 1.284-3.397 1.46-6.976 1.61-10.528.096-2.258-.142-4.537-.345-6.797-.21-2.334-.529-4.659-.857-6.982-.258-1.82-.662-3.622-.895-5.445-.4-3.128-1.21-6.09-3.393-8.547-1.49-1.678-3.05-3.238-5.303-4.059-2.921-1.066-5.963-1.51-9.016-1.95a4.083 4.083 0 0 1-.233-.02Z" fill="#C391B9"/>
            <path d="M42.728 25.296c.005-1.011-.796-1.965-1.664-1.867-1.273.143-1.808.84-1.797 1.907.014 1.325.844 1.785 1.828 1.867.88.073 1.628-.865 1.633-1.907Zm.017 29.212c.02-1.35-.905-2.324-2.21-2.322-1.284.001-2.172.971-2.188 2.388-.015 1.44.903 2.403 2.293 2.41 1.206.005 2.084-1.028 2.106-2.476Zm-6.866-34.94c.009-1.444-1.15-2.72-2.494-2.75-1.442-.03-2.574 1.164-2.593 2.733-.018 1.543 1.155 2.799 2.569 2.75 1.374-.047 2.51-1.28 2.518-2.734ZM25.07 46.907c-1.784-.03-3.04 1.182-3.066 2.956-.03 1.873 1.189 3.241 2.92 3.28 1.693.04 3.043-1.278 3.087-3.015.05-1.889-1.14-3.19-2.94-3.221ZM38.515 31.45c-1.036-.916-2.28-1.32-3.597-1.404-4.884-.31-8.151 4.354-7.162 8.692.637 2.797 3.126 5.357 6.132 5.422 2.643.423 5.794-1.296 6.978-4.525 1.12-3.066-.046-6.622-2.351-8.185Zm1.888-19.83a4.624 4.624 0 0 0 .219.02c1.565.823 2.832 2.023 3.978 3.38.278.33.606.611.908.92.735.753 1.467 1.51 2.2 2.264-1.744.293-2.955 1.545-2.817 3.027.138 1.47.776 2.678 2.744 2.747 1.659.057 2.622-.851 2.805-2.614.105.165.223.323.312.497 1.715 3.368 2.968 6.926 3.835 10.618.716 3.05 1.31 6.14 1.286 9.302-.011 1.59-.096 3.192-.322 4.761-.194 1.358-.41 2.752-1.17 3.949 0-.24-.03-.484.002-.72.358-2.479-2.624-5.07-5.02-4.462-2.997.763-3.896 3.614-3.075 5.999.715 2.078 3.611 3.728 6.156 1.933.526-.372.96-.884 1.438-1.333-.975 2.68-2.474 5.05-4.04 7.38-.032-.313-.012-.646-.11-.936-.336-1.017-1.288-1.602-2.359-1.497-.901.088-1.746.89-1.904 1.809-.188 1.097.289 2.15 1.262 2.545.445.182.97.15 1.459.214-.787.91-1.571 1.823-2.362 2.73-.383.437-.777.865-1.167 1.297l.002.002c-2.42.04-4.844.212-7.255.088-3.097-.16-6.193-.498-9.115-1.739-1.654-.7-3.115-1.672-4.45-2.918-3.273-3.052-4.823-7.016-5.748-11.332-.444-2.064-.712-4.152-.616-6.274.105-2.307.075-4.637.38-6.917.514-3.858 1.143-7.703 2.618-11.34.594-1.464.963-3.023 1.479-4.522.75-2.187 2.238-3.824 3.97-5.177 2.427-1.898 5.177-3.163 8.191-3.628 1.573-.243 3.172-.617 4.79-.133.466.139.995.045 1.495.059Z" fill="#F3C1E9"/>
            <path d="M54.028 51.77c.925-1.243 1.183-2.692 1.417-4.104.271-1.631.369-3.298.38-4.95.02-3.289-.714-6.505-1.595-9.68-1.066-3.842-2.606-7.546-4.704-11.054-.109-.182-.253-.346-.38-.518-.693-1.432-1.808-2.527-3.34-3.293-.896-.787-1.791-1.577-2.69-2.362-.367-.321-.768-.616-1.108-.959-1.4-1.414-2.947-2.665-4.858-3.526 3.509.467 7.003.94 10.361 2.072 2.588.87 4.382 2.52 6.096 4.297 2.512 2.602 3.448 5.732 3.91 9.037.271 1.928.739 3.832 1.037 5.756.38 2.455.75 4.914.994 7.381.238 2.39.513 4.798.406 7.184-.167 3.753-.365 7.536-1.834 11.125-1.307 3.19-3.53 5.712-6.974 7.317-2.794 1.302-5.769 1.897-8.926 1.81.474-.45.954-.893 1.42-1.347.962-.94 1.915-1.888 2.873-2.833l2.007-2.215c1.903-2.42 3.724-4.882 4.904-7.665l.604-1.473Z" fill="#D8ACCF"/>
            <path d="M31.142 40.449c.855.045 1.358-.44 1.44-1.322.104-1.119-.604-1.644-1.434-1.791-.63-.11-1.376.713-1.405 1.456-.039.997.48 1.61 1.399 1.657Zm.279-4.972c1.41-.052 2.61-.64 3.575-1.8.356-.426.615-.892.322-1.522-.32-.694-.773-1.017-1.456-.933-.433.053-.874.095-1.29.221-.966.292-1.8.843-2.416 1.749-.298.438-.483.95-.256 1.48.232.543.64.86 1.219.803.1-.01.201 0 .302.002Zm2.503 7.502c-2.624-.06-4.796-2.473-5.349-5.113-.859-4.094 2-8.502 6.264-8.215 1.151.078 2.236.46 3.14 1.322.026.352.004.718.084 1.054.501 2.104.556 4.22-.064 6.288-.247.824-.72 1.588-1.189 2.3-.733 1.112-1.884 1.637-2.886 2.364Z" fill="#A07296"/>
            <path d="m54.06 50.393-.401 1.483c-.38.47-.727 1.007-1.146 1.398-2.027 1.884-4.319.171-4.878-1.997-.643-2.485.081-5.466 2.464-6.275 1.903-.644 4.26 2.05 3.967 4.64-.029.246-.006.5-.006.751Zm-29.523-4.22c2.25.036 3.74 1.26 3.688 3.03-.048 1.625-1.727 2.852-3.842 2.809-2.161-.047-3.69-1.334-3.662-3.087.024-1.66 1.588-2.788 3.817-2.752Z" fill="#FEDDF7"/>
            <path d="M34.162 42.93c1.179-.803 2.534-1.378 3.395-2.601.552-.784 1.11-1.625 1.398-2.534.727-2.279.66-4.61.068-6.927-.095-.37-.07-.773-.1-1.161 2.37 1.624 3.57 5.323 2.415 8.513-1.216 3.36-4.458 5.15-7.176 4.71Z" fill="#694B63"/>
            <path d="M47.477 18.157a6.502 6.502 0 0 1 2.87 3.197c-.193 1.783-1.203 2.7-2.944 2.641-2.064-.072-2.735-1.292-2.88-2.78-.146-1.498 1.124-2.764 2.955-3.059Zm-12.13 1.865c-.007 1.547-1.31 2.858-2.888 2.907-1.622.05-2.97-1.289-2.95-2.93.018-1.672 1.316-2.941 2.971-2.907 1.543.032 2.876 1.394 2.868 2.93Zm6.985 34.255c-.018 1.26-.85 2.156-1.995 2.15-1.318-.006-2.19-.846-2.177-2.097.012-1.234.854-2.075 2.072-2.075 1.238 0 2.117.847 2.1 2.022Zm7.433 4.937-1.565 2.34c-.462-.07-.958-.033-1.378-.23-.918-.432-1.366-1.584-1.187-2.785.152-1.007.951-1.887 1.804-1.984 1.012-.117 1.91.52 2.225 1.633.091.318.07.683.101 1.026Z" fill="#FEDDF7"/>
            <path d="M42.778 25.13c-.004 1.147-.903 2.18-1.964 2.1-1.187-.093-2.187-.601-2.206-2.061-.016-1.176.628-1.944 2.163-2.1 1.045-.106 2.012.946 2.009 2.06Z" fill="#FEDCF7"/>
            <path d="M30.965 36.248c-.105-.002-.211-.015-.315-.004-.6.068-1.023-.298-1.265-.928-.234-.613-.04-1.207.27-1.715.64-1.05 1.509-1.692 2.51-2.032.435-.146.892-.195 1.341-.258.71-.098 1.18.275 1.513 1.078.302.729.032 1.27-.339 1.767-1.004 1.343-2.252 2.029-3.716 2.092Z" fill="#C1A3BB"/>
            <path d="M30.835 42.095c-1.075-.07-1.677-1.05-1.626-2.647.04-1.192.919-2.517 1.655-2.343.97.23 1.796 1.067 1.666 2.86-.102 1.412-.693 2.196-1.695 2.13Z" fill="#C0A2BA"/>
        </g>
    )}
    </svg>
    }
    </>
  )
}

export default NftRandomImage