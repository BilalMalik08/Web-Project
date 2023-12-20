import "./adminFoodMenu.css";
import HotDrinkMenuEditComp from "./HotDrinkMenuEditComp";

function AdminHotDrinkMenu() {
  return (
    <>
      <div className="row admin-foodMenu-row1">
        <div className="container admin-foodMenu-btn-container">
          <button
            className="btn admin-foodMenu-btn btn-outline-light"
            type="submit"
          >
            Add Item
          </button>
        </div>
      </div>

      <div className="row admin-foodMenu-row2">
        <HotDrinkMenuEditComp />
      </div>
    </>
  );
}

export default AdminHotDrinkMenu;
