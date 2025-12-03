<script setup>
import { ref } from 'vue'
import { useToast } from '@/composables/useToast'
import Select from '@/components/form/Select.vue'
import DatePicker from '@/components/form/DatePicker.vue'
import Accordion from '@/components/data-display/Accordion.vue'
import Tabs from '@/components/navigation/Tabs.vue'
import Modal from '@/components/feedback/Modal.vue'
import MultiSelect from '@/components/form/MultiSelect.vue'
import TagsInput from '@/components/form/TagsInput.vue'
import Collapse from '@/components/data-display/Collapse.vue'
import Alerts from '@/components/feedback/Alerts.vue'
import BadgeBreadcrumb from '@/components/data-display/BadgeBreadcrumb.vue'
import ButtonGroup from '@/components/navigation/ButtonGroup.vue'
import ListGroup from '@/components/data-display/ListGroup.vue'
import ProgressBar from '@/components/feedback/ProgressBar.vue'
import Rating from '@/components/feedback/Rating.vue'
import NavbarDemo from '@/components/navigation/NavbarDemo.vue'
import Pagination from '@/components/navigation/Pagination.vue'
import PopoverTooltip from '@/components/feedback/PopoverTooltip.vue'

const { showToast } = useToast()

// Select
const selectOptions = [
  { value: 'opt1', label: '选项一' },
  { value: 'opt2', label: '选项二' },
  { value: 'opt3', label: '选项三' }
]
const selectedOption = ref('')

// Date Picker
const dateValue = ref('2025-11-26')

// Accordion
const accordionItems = [
  { title: 'Section 1', content: '这是第一部分的内容。支持平滑的展开和折叠动画。' },
  { title: 'Section 2', content: '这是第二部分的内容。可以放入任何HTML元素。' },
  { title: 'Section 3', content: '这是第三部分的内容。' }
]

// Tabs
const tabItems = [
  { id: 'tab1', label: 'Home', content: 'Home tab content. Welcome back!' },
  { id: 'tab2', label: 'Profile', content: 'Profile tab content. User settings here.' },
  { id: 'tab3', label: 'Contact', content: 'Contact tab content. Get in touch.' }
]

// Modal
const showModal = ref(false)

// Tags
const tags = ref(['Vue', 'React'])

// MultiSelect
const multiSelectOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
const selectedMulti = ref([])

// Range
const rangeValue = ref(50)

// Alerts
const alerts = ref([
  { type: 'success', icon: 'fas fa-check-circle', msg: '操作成功完成。' },
  { type: 'warning', icon: 'fas fa-exclamation-triangle', msg: '注意：请检查您的输入。' },
  { type: 'error', icon: 'fas fa-times-circle', msg: '错误：发生了一个问题。' },
  { type: 'info', icon: 'fas fa-info-circle', msg: '信息：有新的更新可用。' }
])
const removeAlert = (index) => alerts.value.splice(index, 1)

</script>

<template>
  <section id="form">
    <h1 class="title">控件展示</h1>
    <div class="grid control-grid">

        <!-- Buttons -->
        <div class="card">
            <h3>操作按钮</h3>
            <p class="section-desc">各种颜色和用途的按钮。</p>
            <button class="btn primary">确认 / 提交</button>
            <button class="btn secondary">取消 / 返回</button>
            <button class="btn reset">重置</button>
            <button class="btn danger">删除</button>
        </div>

        <div class="card">
            <h3>图标按钮</h3>
            <p class="section-desc">常用操作的紧凑按钮。</p>
            <button class="icon-btn purple" aria-label="Edit"><i class="fas fa-edit"></i></button>
            <button class="icon-btn pink" aria-label="Delete"><i class="fas fa-trash"></i></button>
            <button class="icon-btn green" aria-label="Add"><i class="fas fa-plus"></i></button>
            <button class="icon-btn grey" aria-label="More"><i class="fas fa-ellipsis-v"></i></button>
        </div>

        <!-- Input & Select -->
        <div class="card">
            <h3>输入与选择</h3>
            <input type="text" placeholder="普通文本输入" class="input" aria-label="Text Input">
            
            <Select :options="selectOptions" v-model="selectedOption" placeholder="-- 请选择一个选项 --" />

            <DatePicker v-model="dateValue" />
        </div>

        <!-- Radio -->
        <div class="card">
            <h3>单选按钮组</h3>
            <p class="section-desc">选择单个选项。</p>
            <div class="radio-group">
                <label class="radio-container">
                    <input type="radio" name="color" value="red">
                    <span class="radiomark"></span>
                    红色
                </label>
                <label class="radio-container">
                    <input type="radio" name="color" value="blue" checked>
                    <span class="radiomark"></span>
                    蓝色
                </label>
                <label class="radio-container">
                    <input type="radio" name="color" value="green">
                    <span class="radiomark"></span>
                    绿色
                </label>
            </div>
        </div>

        <!-- Switch & Range -->
        <div class="card">
            <h3>开关与范围</h3>
            <label class="checkbox-container">
                <input type="checkbox" checked>
                <span class="checkmark"></span>
                记住登录状态 (Checkbox)
            </label>
            
            <label class="switch-container">
                <input type="checkbox">
                <span class="slider round"></span>
                启用高级模式 (Switch)
            </label>

            <div class="range-container">
                <label for="myRange">设置范围值: <span>{{ rangeValue }}</span></label>
                <input type="range" min="0" max="100" v-model="rangeValue" class="range-slider" id="myRange">
            </div>
        </div>

        <!-- Textarea -->
        <div class="card">
            <h3>多行文本域</h3>
            <p class="section-desc">长文本输入。</p>
            <textarea class="input" placeholder="请输入详细信息..." rows="4" aria-label="Textarea"></textarea>
        </div>

        <!-- File Upload -->
        <div class="card">
            <h3>文件上传</h3>
            <p class="section-desc">点击或拖拽文件。</p>
            <div class="file-upload">
                <input type="file" id="fileUpload" class="file-input" accept="*/*">
                <label for="fileUpload" class="file-label">
                    <i class="fas fa-cloud-upload-alt fa-2x"></i>
                    <span>点击上传文件</span>
                    <span class="file-name">无文件选择</span>
                </label>
            </div>
        </div>

        <!-- Progress -->
        <div class="card">
            <h3>进度条</h3>
            <p class="section-desc">任务进度展示。</p>
            <ProgressBar :value="75" />
        </div>

        <!-- Rating -->
        <div class="card">
            <h3>星级评分</h3>
            <p class="section-desc">用户评分组件。</p>
            <Rating />
        </div>

        <!-- Accordion -->
        <div class="card">
            <h3>Accordion (手风琴)</h3>
            <p class="section-desc">可折叠的内容面板。</p>
            <Accordion :items="accordionItems" />
        </div>

        <!-- Alerts -->
        <div class="card">
            <h3>Alerts (警告框)</h3>
            <p class="section-desc">反馈提示信息。</p>
            <Alerts :items="alerts" @close="removeAlert" />
        </div>

        <!-- Badge & Breadcrumb -->
        <div class="card">
            <h3>Badge & Breadcrumb</h3>
            <p class="section-desc">徽章与面包屑导航。</p>
            <BadgeBreadcrumb />
        </div>

        <!-- Button Group -->
        <div class="card">
            <h3>Button Group</h3>
            <p class="section-desc">组合按钮。</p>
            <ButtonGroup />
        </div>

        <!-- Collapse -->
        <div class="card">
            <h3>Collapse</h3>
            <p class="section-desc">折叠内容切换。</p>
            <Collapse>
                <template #trigger>
                    <button class="btn primary small">切换显示状态</button>
                </template>
                <template #default>
                    <div class="collapse-card-body">
                        这里是被折叠的内容。它可以包含任何信息，点击上方按钮来切换显示或隐藏。
                    </div>
                </template>
            </Collapse>
        </div>

        <!-- List Group -->
        <div class="card">
            <h3>List Group</h3>
            <p class="section-desc">列表组。</p>
            <ListGroup />
        </div>

        <!-- Tabs -->
        <div class="card col-span-2">
            <h3>Navs & Tabs (标签页)</h3>
            <p class="section-desc">内容切换组件。</p>
            <Tabs :tabs="tabItems" />
        </div>

        <!-- Navbar -->
        <div class="card col-span-2">
            <h3>Navbar (导航栏)</h3>
            <p class="section-desc">顶部导航演示。</p>
            <NavbarDemo />
        </div>

        <!-- Pagination -->
        <div class="card">
            <h3>Pagination (分页)</h3>
            <p class="section-desc">多页数据导航。</p>
            <Pagination />
        </div>

        <!-- Popovers & Tooltips -->
        <div class="card">
            <h3>Popovers & Tooltips</h3>
            <p class="section-desc">浮层提示信息。</p>
            <PopoverTooltip />
        </div>

        <!-- Tags Input -->
        <div class="card">
            <h3>Multi Tags Input</h3>
            <p class="section-desc">多标签输入框。</p>
            <TagsInput v-model="tags" />
        </div>

        <!-- Multi Select -->
        <div class="card">
            <h3>Multi-Select Dropdown</h3>
            <p class="section-desc">多选下拉菜单。</p>
            <MultiSelect :options="multiSelectOptions" v-model="selectedMulti" />
        </div>

        <!-- Data Table -->
        <div class="card table-container full-width">
            <h3>数据表格</h3>
            <div style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr><th>ID</th><th>名称</th><th>状态</th><th>操作</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>项目 A</td><td><span class="tag green-tag">已发布</span></td><td><button class="btn small secondary"><i class="fas fa-eye"></i> 查看</button></td></tr>
                        <tr><td>2</td><td>项目 B</td><td><span class="tag purple-tag">进行中</span></td><td><button class="btn small secondary"><i class="fas fa-edit"></i> 编辑</button></td></tr>
                        <tr><td>3</td><td>项目 C</td><td><span class="tag pink-tag">待审核</span></td><td><button class="btn small danger"><i class="fas fa-trash"></i> 删除</button></td></tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  </section>

  <Modal :isOpen="showModal" title="模态框标题" @close="showModal = false" @save="showModal = false">
      <p>这是一个模态框示例。可以在这里放置表单、信息或其他内容。</p>
  </Modal>
</template>
