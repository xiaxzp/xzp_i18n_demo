import { useTranslation } from "react-i18next";
import { setNumeralLocale } from "./i18n";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
export default function Switch() {
  const { i18n, t } = useTranslation();
  const [isRtl, setRtl] = useState(false);
  console.log(t("some key"));
  useEffect(() => {
    if(isRtl){
      document.body.setAttribute("dir", "rtl");
    }else{
      document.body.setAttribute("dir", "ltr");
    }
  },[isRtl])
  const onChange = (locale: string) => {
    i18n.changeLanguage(locale);
    setNumeralLocale(locale);
    dayjs.locale(locale);
  };
  return (
    <>
      <div>now: {i18n.language}</div>
      <section className="flex items-center gap-2">
        <div>change lang:</div>
        <div>
          <button onClick={() => onChange("en")}>EN</button>
          <button className="ml-2" onClick={() => onChange("fr")}>FR</button>
        </div>
      </section>


      <section className="flex items-center gap-2">
        <div>now {!isRtl?  'LRT' : 'RTL' }</div>
        <div className="border-red-500 border-l-4 pl-2 border-solid">
         change to <button onClick={() => setRtl(!isRtl)}>{isRtl? 'LRT' : 'RTL'}</button>
        </div>
      </section>
    </>
  );
}
