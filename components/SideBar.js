export default function SideBar({ options }) {
  return (
    <>
      <div className="min-h-screen py-10 px-10 flex flex-col items-start bg-primary">
        <div>
          <option
            className="cursor-pointer text-secondary font-secondary uppercase"
            onClick={() => window.location.replace("/inbound")}
          >
            inbound
          </option>
          <option
            className="cursor-pointer text-secondary font-secondary uppercase"
            onClick={() => window.location.replace("/inventory")}
          >
            inventory
          </option>
          <option
            className="cursor-pointer text-secondary font-secondary uppercase"
            onClick={() => window.location.replace("/")}
          >
            orders
          </option>
          <option
            className="cursor-pointer text-secondary font-secondary uppercase"
            onClick={() => window.location.replace("/")}
          >
            outbound
          </option>
        </div>
        <hr className="w-full mt-5 border-black border-2" />
        <div className="mt-5">
          {options.map((item, index) => (
            <option
              className="cursor-pointer text-secondary font-secondary uppercase"
              key={index}
              onClick={() => window.location.replace(item.href)}
            >
              {item.option}
            </option>
          ))}
        </div>
      </div>
    </>
  );
}
