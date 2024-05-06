import MenuItems from "./MenuNavBar";

const Navbar = ({ routes }) => {
  return (
    <nav>
      <ul className="menus">
        {routes?.map((menu, index) => {
          return <MenuItems items={menu} key={index} routes={routes} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
