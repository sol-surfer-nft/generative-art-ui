import React from "react"
import { Card, CardBody } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// import Component
import FileLeftBar from "./FileLeftBar"
import FileList from "./FileList"
import RecentFiles from "./RecentFiles"
import Storage from "./Storage"

const FileManager = () => {
  const series = [76]
  
  return (
    <React.Fragment>
      <Breadcrumbs title="Apps" breadcrumbItem="NFT Tool" breadcrumbTitle="NFT Tool (demo)" />
      <div className="d-xl-flex">
        <div className="w-100">
          <div className="d-md-flex">
            <FileLeftBar />
            <div className="w-100">
              <Card>
                <CardBody>
                  <FileList />
                  <RecentFiles />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        <Storage
          options={storageChartOptions}
          series={series}
        />
      </div>
    </React.Fragment>
  )
}

const storageChartOptions = {
  labels: ["Storage"],
  chart: {
    height: 150,
    type: "radialBar",
    sparkline: {
      enabled: true,
    },
  },
  colors: ["#556ee6"],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "97%",
        margin: 5, // margin is in pixels
      },

      hollow: {
        size: "60%",
      },

      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: "16px",
        },
      },
    },
  },
  grid: {
    padding: {
      top: -10,
    },
  },
  stroke: {
    dashArray: 3,
  },
}

export default FileManager
