import { useTranslation } from "react-i18next";
import numeral from "numeral";
import dayjs from "dayjs";
import i18n from "./i18n";
import Switch from "./Switch";

const statickey = i18n.t("key1");
const statickeyFunc = () => i18n.t("key1");

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="w-full p-8 pb-32">
      <Switch />
      <div
				className="mt-4"
      >
        <div style={{ fontWeight: "bold", color: "crimson" }}>use t function from hooks: </div>
				<code className="text-gray-400 text-12 whitespace-break-spaces">{`const { t } = useTranslation();\n{t("key1")}`}</code>
        <div>result: {t("key1")}</div>
      </div>
      <div
				className="mt-4"
      >
        <div style={{ fontWeight: "bold", color: "crimson" }}>static calculated t result: </div>
				<code className="text-gray-400 text-12 whitespace-break-spaces">{`const statickey = i18n.t("key1");\n{statickey}`}</code>
        <div>result: {statickey}</div>
      </div>
      <div
				className="mt-4"
      >
        <div style={{ fontWeight: "bold", color: "crimson" }}>wrapped t, still a function:</div>
				<code className="text-gray-400 text-12 whitespace-break-spaces">{`const statickeyFunc = () => i18n.t("key1");\n{statickeyFunc()}`}</code>
        <div>result: {statickeyFunc()}</div>
      </div>
      <div
				className="mt-4"
      >
        <div style={{ fontWeight: "bold", color: "crimson" }}>translation missing:</div>
				<code className="text-gray-400 text-12 whitespace-break-spaces">{`{t("key_notexist")}`}</code>
        <div>result: {t("key_notexist")}</div>
      </div>


      <div
				className="mt-4"
      >
        <div style={{ fontWeight: "bold", color: "crimson" }}>data number turn to i18n string:</div>
				<code className="text-gray-400 text-12 whitespace-break-spaces">{`{numeral(123456.789).format("0,0.000")}`}</code>
        <div>result: {numeral(123456.789).format("0,0.000")}</div>
      </div>

      <div
				className="mt-4"
      >
        <div style={{ fontWeight: "bold", color: "crimson" }}>i18n number string reverse to data number:</div>
				<code className="text-gray-400 text-12 whitespace-break-spaces">{`{numeral("123456.789").value()}`}</code>
        <div>result: {numeral("123456.789").value()}</div>
      </div>

      <div
				className="mt-4"
      >
        <div style={{ fontWeight: "bold", color: "crimson" }}>date i18n:</div>
				<code className="text-gray-400 text-12 whitespace-break-spaces">{`{dayjs().format("LLL")}`}</code>
        <div>result: {dayjs().format("LLL")}</div>
      </div>

    </div>
  );
}
