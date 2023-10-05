import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import generatePDF, { Margin } from "react-to-pdf";

import Logo from "../../assets/logo.svg";
import Crime from "../../assets/crime.svg";
import API_Service from "../../api/service";
import Placeholder from "../placeholder/Placeholder";

function PDF() {
  const [data, setData] = useState([]);
  const day = new Date();
  async function getData() {
    try {
      const res = await API_Service.getRequest();
      if (res.status === 200) {
        const arrests = [];
        res.data.data.map((key) => {
          arrests.push({ name: key.data_year, uv: key.Burglary });
        });
        setData(arrests);
      }
    } catch (e) {
      console.log("Error occured", e);
    }
  }
  const options = {
    page: {
      margin: Margin.SMALL,
      format: "letter",
    },
  };
  const getTargetElement = () => document.getElementById("pdf-document");
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div id="pdf-document">
        <div className="p-4">
          <div>
            <div className="mb-2 flex items-center justify-between font-semibold text-sm">
              <img src={Logo} width={128} />
              <div className="text-right text-[#000000] ">
                123 Main Street, Dover, NH 03820-4667
              </div>
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-[#005DFF] via-[#00A3FF] to-[#21DDFF]"></div>
          </div>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <div className="mt-8">
            <div className="flex items-center justify-between font-semibold text-sm">
              <img src={Crime} width={96} />
              <div className="h-0.5 w-full bg-gradient-to-r from-[#005DFF] via-[#00A3FF] to-[#21DDFF]"></div>
            </div>
          </div>
          <section className="mt-2 text-gray-600 body-font">
            <div className="container mx-auto">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div className="h-full bg-[#F2F4F5] rounded-xl">
                    <div
                      className="bg-[#E8EEFB] text-[#1463FF] text-left font-medium px-4 py-2 rounded-t-xl"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Bugalary
                    </div>
                    <div className="bg-white mx-8 my-4 pr-4 py-2 rounded-xl">
                      <LineChart width={800} height={300} data={data}>
                        <Line
                          dataKey="uv"
                          dot={false}
                          stroke="#1463FF"
                          strokeWidth={3}
                        />
                        <CartesianGrid stroke="#ccc" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis
                          label={{
                            value: "Arrests",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                      </LineChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="py-4">
            <div className="h-0.5 w-full bg-gradient-to-r from-[#005DFF] via-[#00A3FF] to-[#21DDFF]"></div>
            <div className="mt-2 flex items-center justify-between font-semibold text-sm">
              <div className="text-right text-[#1463FF]">
                Report Generated on{" "}
                {day.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex gap-1 text-right text-[#000000]">
                <div className="text-[#090E24]">
                  RealAssist Property Report | Page 1
                </div>
                <div className="text-[#626E99]">of 25</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => generatePDF(getTargetElement, options)}>
        Generate PDF
      </button>
    </>
  );
}

export default PDF;
