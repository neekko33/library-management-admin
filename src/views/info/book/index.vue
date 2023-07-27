<script setup>
import { getBookData, searchBook, addBook, editBook, deleteBook, getBookDataById } from "../../../api/books";
import { getAllCategoryData } from '../../../api/categories'
import { reactive } from "vue";
import Table from "../../../components/table.vue";
import Form from "../../../components/form.vue"
import { ElMessage } from "element-plus";

const state = reactive({
  tableLabel: [
    {
      label: '图书ID',
      key: 'BookID'
    },
    {
      label: '图书名称',
      key: 'Title'
    },
    {
      label: '作者',
      key: 'Author'
    },
    {
      label: '出版社',
      key: 'PublishingHouse'
    },
    {
      label: 'ISBN',
      key: 'ISBN'
    },
    {
      label: '分类标识',
      key: 'Category'
    },
    {
      label: '在馆状态',
      key: 'AvailabilityStatus'
    },
    {
      label: '馆藏地址',
      key: 'Location'
    },
  ],
  tableData: null,
  formLabel: [
    {
      label: '图书名称',
      key: 'title',
      isInput: true
    },
    {
      label: '作者',
      key: 'author',
      isInput: true
    },
    {
      label: '出版时间',
      key: 'publicationDate',
      isDate: true
    },
    {
      label: '出版社',
      key: 'publishingHouse',
      isInput: true
    },
    {
      label: 'ISBN码',
      key: 'isbn',
      isInput: true
    },
    {
      label: '价格',
      key: 'price',
      isInput: true
    },
    {
      label: '分类',
      key: 'categoryId',
      options: [],
      isSelect: true
    },
    {
      label: '可用状态',
      key: 'availabilityStatus',
      isInput: true
    },
    {
      label: '位置',
      key: 'location',
      isInput: true
    },
    {
      label: '封面图片',
      key: 'imgUrl',
      isInput: true
    },
    {
      label: '图书简介',
      key: 'introduction',
      isText: true
    },
  ],
  formData: {
    title: '',
    author: '',
    publicationDate: new Date(),
    publishingHouse: '',
    isbn: '',
    price: '',
    categoryId: 1,
    availabilityStatus: '在馆',
    location: '',
    imgUrl: '',
    introduction: ''
  },
  total: 0,
  page: 1,
  loading: true,
  placeholder: '请输入图书名称、作者或ISBN',
  showDialog: false,
  dialogId: 0
})
const getTableData = async () => {
  state.loading = true
  const { total, page, data } = await getBookData({ page: state.page })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const getCategoryData = async () => {
  const { data } = await getAllCategoryData()
  state.formLabel.find(item => item.key === 'categoryId').options = data
}

const handleSearch = async (search) => {
  state.loading = true
  const { total, page, data } = await searchBook({ page: state.page, search })
  state.total = total
  state.page = page
  state.tableData = data
  state.loading = false
}

const handlePageChange = (page, search) => {
  state.page = page
  if (search.trim() === '') {
    getTableData()
  } else {
    handleSearch(search)
  }
}

const resetFormData = () => {
  for (let key in state.formData) {
    if (key === 'availabilityStatus') {
      state.formData[key] = '在馆'
    } else {
      switch (typeof (state.formData[key])) {
        case 'number':
          state.formData[key] = 1
          break
        case 'object':
          state.formData[key] = new Date()
          break
        default:
          state.formData[key] = ''
          break
      }
    }
  }
}

const handleAddData = async () => {
  state.dialogId = 0
  state.showDialog = true
}

const handleSubmit = async () => {
  if (!state.dialogId) {
    const { msg } = await addBook(state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  } else {
    const { msg } = await editBook(state.dialogId, state.formData)
    ElMessage({
      message: msg,
      type: 'success'
    })
  }
  state.showDialog = false
  resetFormData()
  getTableData()
}

const handleEdit = async (bookId) => {
  state.dialogId = bookId
  const { data } = await getBookDataById(bookId)
  state.formData.title = data.Title
  state.formData.author = data.Author
  state.formData.publicationDate = new Date(data.PublicationDate)
  state.formData.publishingHouse = data.PublishingHouse
  state.formData.isbn = data.ISBN
  state.formData.price = data.Price
  state.formData.categoryId = data.CategoryID
  state.formData.availabilityStatus = data.AvailabilityStatus
  state.formData.location = data.Location
  state.formData.imgUrl = data.ImgUrl
  state.formData.introduction = data.Introduction
  state.showDialog = true
}

const handleDelete = async (bookId) => {
  const { msg } = await deleteBook(bookId)
  ElMessage({
    message: msg,
    type: 'success'
  })
  state.page = 1
  getTableData()
}

getTableData()
getCategoryData()

</script>
<template>
  <Table :table-label="state.tableLabel" :table-data="state.tableData" :total="state.total" :page="state.page"
    :placeholder="state.placeholder" :loading="state.loading" @page-change="handlePageChange" @search="handleSearch"
    @add="handleAddData" @edit="handleEdit" @delete="handleDelete" />
  <el-dialog v-model="state.showDialog" title="图书详情">
    <Form :form-data="state.formData" :form-label="state.formLabel" @submit="handleSubmit" />
  </el-dialog>
</template>

<style></style>