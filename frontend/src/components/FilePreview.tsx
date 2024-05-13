import { useSelector } from "react-redux";
import { selectCurrentFile } from "../state/folderSlice";
import { useGetFileQuery } from "../state/api";
import { TileLayer, MapContainer, GeoJSON } from "react-leaflet";
import { LatLngExpression } from "leaflet";


const FilePreview = () => {
  const currentFile = useSelector(selectCurrentFile);
  const noFileToShow = currentFile == null;
  const {data, isFetching, isError} = useGetFileQuery(currentFile ?? 1, {skip: noFileToShow});

  console.log("currentFile", currentFile);
  console.log("noFileToShow", noFileToShow);

  if (noFileToShow || data == undefined) {
    return (
      <p className="text-xl">
        Click on a file to preview it!
      </p>
    )
  }

  if (isError) {
    return (
      <p className="text-red-900 text-xl">
        An error occurred when loading file preview.
      </p>
    );
  }

  if (isFetching) {
    return (
      <p className="text-xl">
        Loading file preview...
      </p>
    );
  }

  if (data.name.endsWith(".geojson")) {
    return <GeojsonPreview file={data.file} name={data.name}/>
  } else if (data.name.endsWith(".csv")) {
    return <CsvPreview file={data.file} name={data.name}/>
  }
  return <UnsupportedFilePreview file={data.file} name={data.name}/>
}

interface PreviewProps {
  file: string;
  name: string;
}

const GeojsonPreview = ({file}: PreviewProps) => {
  const geoData = JSON.parse(file);
  const australiaLatLong: LatLngExpression = [-25.27, 133.78];

  return (
    <MapContainer center={australiaLatLong} zoom={4} scrollWheelZoom={false} className="h-[600px]">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <GeoJSON data={geoData}/>
    </MapContainer>
  );
}

const CsvPreview = ({file, name}: PreviewProps) => {
  const lines = file.split("\n", 3);
  return (
    <div className="w-full">
      <h3 className="text-xl">File Preview of {name}</h3>
      <table className="border-separate">
        <tr key={"csv-header-row"}>
          {lines[0].split(',').map((value, j) => (
            <th key={j} className="px-4">{value}</th>
          ))}
        </tr>
        {lines.slice(1).map((line, i) => (
            <tr key={i}>
              {line.split(',').map((value, j) => (
                <td key={j} className=" px-4">{value}</td>
              ))}
            </tr>
          )
        )}
      </table>
    </div>
  );
}

const UnsupportedFilePreview = ({name}: PreviewProps) => {
  return (
    <p className="text-red-900">
      The file type of {name} is not supported for preview yet.
    </p>
  );
}

export default FilePreview;