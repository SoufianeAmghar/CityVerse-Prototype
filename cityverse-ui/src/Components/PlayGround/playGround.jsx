import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import Graphic from "@arcgis/core/Graphic";
import Map from "@arcgis/core/Map.js";
import WebScene from "@arcgis/core/WebScene";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import esriConfig from "@arcgis/core/config";
import "./playGround.css";
import Legend from "@arcgis/core/widgets/Legend.js";

export const PlayGround = () => {
  const MapE1 = useRef(null);

  useEffect(() => {
    // console.log(MapE1.current);
    // const map = new ArcGISMap({
    //   basemap: "topo",
    // });
    esriConfig.apiKey =
      "AAPKb67c141581824c3087042ea1d6fcb9bekrZPn6II5Q_C4zTFN1IbjG4IH0WUc2h6VuXNoTrqI-_q-bjc1gn7YsEDyld6muhD";
    const map = new WebScene({
      portalItem: {
        id: "cdb4415be735405ca2f2972ae23a2058",
      },
      // elevationInfo: {
      //   mode: "absolute-height",
      //   offset: 6
      // }
    });
 
    // var map = new Map({
    //   basemap: "arcgis/topographic", // basemap styles service
    //   ground: "world-elevation", //Elevation service
    // });

    const view = new SceneView({
      map,
      container: MapE1.current,
      // camera: {
      //   position: {
      //     x: -118.808, //Longitude
      //     y: 33.961, //Latitude
      //     z: 2000 //Meters
      //   },
      //   tilt: 75
      // },
      // center: [-118, 34],
      // zoom: 0,
    });
    // const legend = new Legend({
    //   view: view,
    // });
    // view.ui.add(legend, "top-right");
  }, []);

  // view.when(() => {
  //   console.log("view ready");
  // });

  return <div className="viewDiv" ref={MapE1}></div>;
};
