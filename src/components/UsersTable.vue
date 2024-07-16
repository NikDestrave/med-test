<template>
  <table class="border-collapse table-auto w-full text-sm mt-4">
    <thead>
      <tr>
        <th class="border-b font-medium p-3 pl-8 pt-0 pb-3 text-slate-400 text-left">ФИО</th>
        <th class="border-b font-medium p-3 pt-0 pb-3 text-slate-400 text-left">Должность</th>
        <th class="border-b font-medium p-3 pt-0 pb-3 text-slate-400 text-left">Отделение</th>
        <th class="border-b font-medium p-3 pr-8 pt-0 pb-3 text-slate-400 text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.dataList" :key="item.id">
        <td class="border-b border-slate-100 p-3 pl-8 text-slate-500">{{ item.name }}</td>
        <td class="border-b border-slate-100 p-3 text-slate-500">{{ item.position }}</td>
        <td class="border-b border-slate-100 p-3 text-slate-500">{{ item.department }}</td>
        <td class="border-b border-slate-100 p-3 pr-8 text-slate-500 space-x-2">
          <button class="text-gray-700" @click="emits('onEdit', item.id)">Редактировать</button>
          <button class="text-red-500" @click="emits('onDelete', item.id)">Удалить</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
interface DataItem {
  id: number;
  name: string;
  position: string;
  department: string;
}

const props = defineProps<{
  dataList: DataItem[];
}>();

const emits = defineEmits(['onEdit', 'onDelete']);
</script>

<style scoped></style>