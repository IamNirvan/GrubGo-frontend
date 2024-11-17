import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { useParams } from "react-router-dom";

const MetricsPage = () => {
  const { dishId } = useParams();

  return (
    <MainLayout>
      <div style={{ padding: "20px" }}>
        {/* <header style={{ backgroundColor: "#FF6F61", padding: "10px" }}>
          <h1>GrubGo</h1>
        </header> */}

        <h2>Dish Metrics for Dish #{dishId}</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div
            style={{
              width: "150px",
              height: "100px",
              backgroundColor: "#E8EAF6",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <h3>55</h3>
            <p>Units sold today</p>
          </div>
          <div
            style={{
              width: "150px",
              height: "100px",
              backgroundColor: "#E8EAF6",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <h3>237</h3>
            <p>Units sold this quarter</p>
          </div>
          <div
            style={{
              width: "150px",
              height: "100px",
              backgroundColor: "#E8EAF6",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <h3>23%</h3>
            <p>Revenue accounted for</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1, backgroundColor: "#F0F0F0", padding: "20px" }}>
            <h3>Peak order hours</h3>
            {/* Placeholder for chart */}
          </div>
          <div
            style={{
              width: "200px",
              backgroundColor: "#F0F0F0",
              padding: "20px",
            }}
          >
            <h3>ASBA results</h3>
            <button style={{ backgroundColor: "#e0e0e0", margin: "5px" }}>
              Positive (12)
            </button>
            <button
              style={{
                backgroundColor: "#FF6F61",
                color: "#fff",
                margin: "5px",
              }}
            >
              Negative (7)
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MetricsPage;
