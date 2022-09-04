// --- Khởi tạo Class --- \\
class Listcar {
  constructor(id, img, name, color, quantity, price) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.color = color;
    this.quantity = quantity;
    this.price = price;
  }
}
// --- Lưu mã nguồn --- \\
const key_data = "product_data";
var listcars = [];
function init() {
  if (getData(key_data) == null) {
    listcars = [
      new Listcar(
        1,
        "https://static.carmudi.vn/wp-content/uploads/2020-08/PBmM48LHsi.jpg",
        "Ferrari 488 GTB",
        "Black",
        1,
        6000000000
      ),
      new Listcar(
        2,
        "https://static1.cafeauto.vn/cafeautoData/upload/tintuc/thitruong/2018/08/tuan-04/15-1535446792.jpg",
        "Ferrari 488 Pista",
        "White",
        1,
        7600000000
      ),
      new Listcar(
        3,
        "https://tapchigiaothong.qltns.mediacdn.vn/tapchigiaothong.vn/files/duc.anh/2015/07/29/3096901_ferrari-488-spider-03-1-0938.jpg",
        "Ferrari 488 GTB Spider",
        "Blue",
        1,
        6500000000
      ),
    ];
    setData(key_data, listcars);
  } else {
    listcars = getData(key_data);
  }
}
function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setData(key, data) {
  return localStorage.setItem(key, JSON.stringify(data));
}
// --- Render ---\\
function renderListcar(cars) {
  let htmls = cars.map(function (listcar, index) {
    return `
            <tr>
              <td class="text-center">
                <img
                  class="image-sm"
                  src="${listcar.img}"
                />
              </td>
              <td class="text-center">${listcar.name}</td>
              <td class="text-center">${listcar.color}</td>
              <td class="text-center">${listcar.quantity}</td>
              <td class="text-right">${formatCurrency(listcar.price)}</td>
              <td class="text-center">
                <button class="btn btn-edit" onclick="editListcar(${
                  listcar.id
                })">Edit</button> 
                <button class="btn btn-remove" onclick="removeListcar(${
                  listcar.id
                })">Remove</button> 
              </td>
            </tr> 
            `;
  });
  document.querySelector(".table>tbody").innerHTML = htmls.join("");
}
function openModal() {
  document.querySelector(".modal-container").classList.add("show");
}
function closeModal() {
  document.querySelector(".modal-container").classList.remove("show");
  resetForm();
}
// --- Add --- \\
function addCar() {
  let image = document.querySelector("#image").value;
  let name = document.querySelector("#name").value;
  if (!validation(name)) {
    alert("Please input new product name!");
    return;
  }
  let color = document.querySelector("#color").value;
  if (!validation(color)) {
    alert("Please input new product color!");
    return;
  }
  let quantity = Number(document.querySelector("#quantity").value);
  if (quantity < 1 && quantity == null) {
    alert("Please input new product quantity!");
    return;
  }
  let price = Number(document.querySelector("#price").value);
  if (price < 1 && price == null) {
    alert("Please input new product price!");
    return;
  }
  let id = findMaxId() + 1;
  let newListcar = new Listcar(id, image, name, color, quantity, price);

  listcars.unshift(newListcar);
  setData(key_data, listcars);
  closeModal();
  renderListcar(listcars);
  resetForm();
}
// --- Điều kiện --- \\
function validation(field) {
  return field != null && field.trim() != "";
}
// --- Sắp xếp --- \\
function findMaxId() {
  let listcarTemp = [...listcars];
  let maxId = listcarTemp.sort(function (lc1, lc2) {
    return lc2.id - lc1.id;
  })[0].id;
  return maxId;
}
// --- Chuyển tiền --- \\
function formatCurrency(number) {
  return number.toLocaleString("vi", { style: "currency", currency: "VND" });
}
// --- Reset --- \\
function resetForm() {
  document.querySelector("#listcarID").value = "0";
  document.querySelector("#image").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#color").value = "";
  document.querySelector("#quantity").value = "";
  document.querySelector("#price").value = "";

  document.querySelector("#btnUpdate").classList.add("d-none");
  document.querySelector("#btnAdd").classList.remove("d-none");

  document.querySelector(".modal-title").innerText = "Add Listcar";
}

// --- Xóa --- \\
function removeListcar(id) {
  let index = listcars.findIndex(function (lsc) {
    return lsc.id == id;
  });
  let confirmed = confirm("Are you sure to product remove?");
  if (confirmed) {
    listcars.splice(index, 1);
    setData(key_data, listcars);
    renderListcar(listcars);
  }
}
// --- Sửa --- \\
function editListcar(listcarID) {
  let listcar = listcars.find(function (ltr) {
    return ltr.id == listcarID;
  });
  document.querySelector("#listcarID").value = listcar.id;
  document.querySelector("#image").value = listcar.image;
  document.querySelector("#name").value = listcar.name;
  document.querySelector("#color").value = listcar.color;
  document.querySelector("#quantity").value = listcar.quantity;
  document.querySelector("#price").value = formatCurrency(listcar.price);

  document.querySelector("#btnUpdate").classList.remove("d-none");
  document.querySelector("#btnAdd").classList.add("d-none");

  document.querySelector(".modal-title").innerText = "Update Listcar";
  openModal();
}
// --- Save --- \\
function updateList() {
  let id = document.querySelector("#listcarID").value;

  let listcar = listcars.find(function (ltr) {
    return ltr.id == id;
  });

  listcar.image = document.querySelector("#image").value;
  listcar.name = document.querySelector("#name").value;
  listcar.color = document.querySelector("#color").value;
  listcar.quantity = document.querySelector("#quantity").value;
  listcar.price = document.querySelector("#price").value;
  setData(key_data, listcars);

  closeModal();
  renderListcar(listcars);
}
function searchCar() {
  let keyword = document.querySelector("#search").value;
  console.log(keyword);
  let result = listcars.filter(function (listcar) {
    return listcar.name.toLowerCase().includes(keyword.toLowerCase());
  });
  renderListcar(result);
}

function ready() {
  init();
  renderListcar(listcars);
}
ready();
