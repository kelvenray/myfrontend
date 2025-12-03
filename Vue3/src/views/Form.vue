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

// Popover
const showPopover = ref(false)
const popoverTarget = ref(null)
const togglePopover = (event) => {
    showPopover.value = !showPopover.value
}
</script>

<template>
  <section id="form" class="page active">
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
            <div class="progress-container">
                <div class="progress-label">75% 完成</div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: 75%"></div>
                </div>
            </div>
        </div>

        <!-- Rating -->
        <div class="card">
            <h3>星级评分</h3>
            <p class="section-desc">用户评分组件。</p>
            <div class="rating">
                <input type="radio" id="star5" name="rating" value="5"><label for="star5" title="5星"><i class="fas fa-star"></i></label>
                <input type="radio" id="star4" name="rating" value="4"><label for="star4" title="4星"><i class="fas fa-star"></i></label>
                <input type="radio" id="star3" name="rating" value="3" checked><label for="star3" title="3星"><i class="fas fa-star"></i></label>
                <input type="radio" id="star2" name="rating" value="2"><label for="star2" title="2星"><i class="fas fa-star"></i></label>
                <input type="radio" id="star1" name="rating" value="1"><label for="star1" title="1星"><i class="fas fa-star"></i></label>
            </div>
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
            <div v-for="(alert, index) in alerts" :key="index" :class="['alert', alert.type]">
                <i :class="alert.icon"></i> 
                <span>{{ alert.msg }}</span>
                <span class="close-btn" @click="removeAlert(index)">&times;</span>
            </div>
        </div>

        <!-- Badge & Breadcrumb -->
        <div class="card">
            <h3>Badge & Breadcrumb</h3>
            <p class="section-desc">徽章与面包屑导航。</p>
            <div style="margin-bottom: 1.5rem;">
                <span class="badge primary">Primary</span>
                <span class="badge secondary">Secondary</span>
                <span class="badge success">Success</span>
                <span class="badge danger">Danger</span>
                <span class="badge warning">Warning</span>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <span class="badge rounded primary">12</span>
                <span class="badge rounded success"><i class="fas fa-check"></i></span>
                <span class="badge rounded danger">!</span>
            </div>
            
            <h4 style="margin-bottom: 0.5rem; font-size: 1rem; color: var(--accent);">Breadcrumb</h4>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">首页</a></li>
                    <li class="breadcrumb-item"><a href="#">管理</a></li>
                    <li class="breadcrumb-item active" aria-current="page">数据列表</li>
                </ol>
            </nav>
        </div>

        <!-- Button Group -->
        <div class="card">
            <h3>Button Group</h3>
            <p class="section-desc">组合按钮。</p>
            <div class="btn-group">
                <button class="btn small">左</button>
                <button class="btn small">中</button>
                <button class="btn small">右</button>
            </div>
            <br><br>
            <div class="btn-group vertical">
                <button class="btn small">顶部</button>
                <button class="btn small">中间</button>
                <button class="btn small">底部</button>
            </div>
        </div>

        <!-- Collapse -->
        <div class="card">
            <h3>Collapse</h3>
            <p class="section-desc">折叠内容切换。</p>
            <Collapse>
                这里是被折叠的内容。它可以包含任何信息，点击上方按钮来切换显示或隐藏。
            </Collapse>
        </div>

        <!-- List Group -->
        <div class="card">
            <h3>List Group</h3>
            <p class="section-desc">列表组。</p>
            <ul class="list-group">
                <li class="list-group-item active">
                    <i class="fas fa-star"></i> 活跃项
                </li>
                <li class="list-group-item">
                    <i class="fas fa-envelope"></i> 收件箱 
                    <span class="badge rounded primary" style="font-size: 0.7em; padding: 0.2em 0.5em; margin-left: auto;">14</span>
                </li>
                <li class="list-group-item">
                    <i class="fas fa-cog"></i> 设置
                </li>
                <li class="list-group-item disabled">
                    <i class="fas fa-ban"></i> 禁用项
                </li>
            </ul>
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
            <nav class="navbar-demo">
                <a href="#" class="navbar-brand">Logo</a>
                <div class="navbar-menu">
                    <a href="#" class="navbar-item active">Home</a>
                    <a href="#" class="navbar-item">Link</a>
                    <div class="navbar-item dropdown-toggle">
                        <span>Menu <i class="fas fa-caret-down"></i></span>
                    </div>
                </div>
            </nav>
        </div>

        <!-- Pagination -->
        <div class="card">
            <h3>Pagination (分页)</h3>
            <p class="section-desc">多页数据导航。</p>
            <div class="pagination-wrapper">
                <ul class="pagination">
                    <li class="page-item disabled"><a href="#" class="page-link"><i class="fas fa-chevron-left"></i></a></li>
                    <li class="page-item active"><a href="#" class="page-link">1</a></li>
                    <li class="page-item"><a href="#" class="page-link">2</a></li>
                    <li class="page-item"><a href="#" class="page-link">3</a></li>
                    <li class="page-item"><a href="#" class="page-link"><i class="fas fa-chevron-right"></i></a></li>
                </ul>
                <div class="page-jump">
                    <span>跳转至</span>
                    <input type="number" class="page-jump-input" placeholder="#" min="1">
                    <span>页</span>
                </div>
            </div>
        </div>

        <!-- Popovers & Tooltips -->
        <div class="card">
            <h3>Popovers & Tooltips</h3>
            <p class="section-desc">浮层提示信息。</p>
            <button class="btn secondary small popover-trigger" data-content="这是一段弹出框的内容！">
                点击显示 Popover
            </button>
            <br><br>
            <button class="btn secondary small tooltip-trigger" data-tooltip="这是一个工具提示">
                悬停显示 Tooltip
            </button>
        </div>

        <!-- Modals & Toasts -->
        <div class="card">
            <h3>Modals & Toasts</h3>
            <p class="section-desc">模态框与通知。</p>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="btn primary small" @click="showModal = true" style="margin-bottom: 0;">打开模态框 (Modal)</button>
                <button class="btn success small" @click="showToast('这是一条成功的通知消息！', 'success')" style="margin-bottom: 0;">显示通知 (Toast)</button>
            </div>
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
